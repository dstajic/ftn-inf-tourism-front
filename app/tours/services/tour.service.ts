export class TourServices {
  private serverUrl = 'http://localhost:48696/';
  private endpoint = 'api/tours/';

  getTourById(id: number): void {
    fetch(this.serverUrl + this.endpoint + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed. Status: ' + response.status);
        }
        return response.json();
      })
      .then(tour => console.log('Retrieved tour:', tour)) // <-- log here
      .catch(error => console.error('Error:', error.message));
  }
}
