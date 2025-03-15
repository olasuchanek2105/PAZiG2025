-- Drop existing tables if they exist
DROP TABLE IF EXISTS Preferences;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Tickets;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Organizers;
DROP TABLE IF EXISTS Users;

-- Users table
CREATE TABLE Users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    email NVARCHAR(255) UNIQUE NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    name NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) CHECK (role IN ('user', 'organizer')) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Organizers table
CREATE TABLE Organizers (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    company_name NVARCHAR(255) NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
GO

-- Events table
CREATE TABLE Events (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    organizer_id UNIQUEIDENTIFIER NOT NULL,
    name NVARCHAR(255) NOT NULL,
    description TEXT NULL,
    date DATETIME NOT NULL,
    location NVARCHAR(255) NOT NULL,
    max_tickets INT NOT NULL CHECK (max_tickets > 0),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (organizer_id) REFERENCES Users(id) ON DELETE CASCADE
);
GO

-- Tickets table
CREATE TABLE Tickets (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    event_id UNIQUEIDENTIFIER NOT NULL,
    user_id UNIQUEIDENTIFIER NULL,
    ticket_type NVARCHAR(50) CHECK (ticket_type IN ('standard', 'VIP', 'ulgowy')) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    purchased_at DATETIME NULL,
    qr_code NVARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE NO ACTION
);
GO

-- Payments table with adjusted ON DELETE behavior
CREATE TABLE Payments (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    ticket_id UNIQUEIDENTIFIER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status NVARCHAR(50) CHECK (payment_status IN ('pending', 'success', 'failed')) NOT NULL,
    payment_provider NVARCHAR(50) CHECK (payment_provider IN ('Przelewy24', 'Stripe')) NOT NULL,
    transaction_id NVARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    -- Avoid cascade path conflict by using NO ACTION or SET NULL
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(id) ON DELETE NO ACTION -- Changed to NO ACTION
);
GO


-- Preferences table
CREATE TABLE Preferences (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    health_info TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
GO
