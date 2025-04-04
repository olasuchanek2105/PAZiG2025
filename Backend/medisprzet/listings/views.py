from django.shortcuts import render
from .forms import OrderForm

def add_listings(request):
    if request.method == "POST":
        form = OrderForm(request.POST)
        if form.is_valid():
            form.save()
            # return redirect("home")  # można później odblokować
    else:
        form = OrderForm()

    return render(request, 'listings/add_listing.html', {'form': form})
