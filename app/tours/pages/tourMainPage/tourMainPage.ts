
import { TourServices } from '../../../../dist/tours/services/tour.service.js';
import { Tour } from '../../models/tour.model';
const tourService = new TourServices();


// The local definitions for Tour, User, KeyPoint, and TourStatus that were here are removed.
// We are now importing the Tour interface from the model file.

document.addEventListener('DOMContentLoaded', () => {
  const tourListElement = document.getElementById('tourList');

  if (!tourListElement) {
    console.error("Element with id 'tourList' not found.");
    return;
  }

  tourService.getAllTours(0, 1, 10, 'Name', 'ASC')
    .then((tourList: Tour[]) => {
      console.log("Fetched tours:", tourList);

      // Handle empty array
      if (!Array.isArray(tourList) || tourList.length === 0) {
        tourListElement.innerHTML = "<p>No tours found.</p>";
        return;
      }

      // Clear existing content
      tourListElement.innerHTML = "";

      for (const tour of tourList) {
        const tourElement = document.createElement('div');
        tourElement.classList.add('tourCard');

        // Safe rendering: check for missing fields
        const tourName = tour.name ?? 'Unnamed Tour';
        const tourDesc = tour.description ?? '';
        const tourDate = tour.dateTime ? new Date(tour.dateTime).toLocaleString() : 'N/A';
        const tourMaxGuests = tour.maxGuests ?? 'N/A';
        const tourGuide = tour.guide?.username ?? 'Nije dodeljen';
        const tourKeyPoints = Array.isArray(tour.keyPoints) ? tour.keyPoints.length : 0;
        const tourStatus = tour.status ?? 'Unknown';

        tourElement.innerHTML = `
          <h2>${tourName}</h2>
          <p>${tourDesc}</p>
          <p>Početak: ${tourDate}</p>
          <p>Maksimalni broj putnika: ${tourMaxGuests}</p>
          <p>Vodič: ${tourGuide}</p>
          <p>Broj ključnih tačaka: ${tourKeyPoints}</p>
          <p>Status: ${tourStatus}</p>
        `;

        // Settings button
        const settingsDiv = document.createElement('div');
        settingsDiv.className = 'settingsDiv';

        const editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.textContent = '⚙️';
        editButton.addEventListener('click', () => {
          console.log(`Uredi turu: ${tourName}`);
          // TODO: Add your edit logic here
        });

        settingsDiv.appendChild(editButton);
        tourElement.appendChild(settingsDiv);
        tourListElement.appendChild(tourElement);
      }
    })
    .catch(err => {
      console.error("Failed to load tours:", err);
      tourListElement.innerHTML = "<p>Failed to load tours. Please try again later.</p>";
    });
});