import { Tour } from "../models/tour.model";
export class TourServices {
  private serverUrl = 'http://localhost:48696/';
  private endpoint = 'api/tours';
  
  getAllTours(
  guideId: number,
  page: number,
  pageSize: number,
  orderBy: string,
  orderDirection: string
): Promise<Tour[]> {
  return fetch(`${this.serverUrl}${this.endpoint}?guideId=${guideId}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderDirection=${orderDirection}`)
    .then(response => {
      if (!response.ok) throw new Error('Request failed. Status: ' + response.status);
      return response.json() as Promise<Tour[]>;
    })
    
    
}
  getTourById(id: number): Promise<Tour> {
    return fetch(this.serverUrl + this.endpoint + "/" +id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed. Status: ' + response.status);
        }
        return response.json();
      })
      
  }
  createTour(newTour:Tour):void{
    fetch(this.serverUrl + this.endpoint, {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(newTour)
    })
    .then(response => {
      if(!response.ok)
      {
        throw new Error('Request failed. Status: '+response.status);
      }
      return response.json();
    })
    .then(newTour => {
        console.log("New tour createdL: ",newTour);
      }
    )
    .catch(error => console.error('Error:', error.message));
    
    
  }
  updateTour(tourId:number,updatedTour:Tour):void{
    fetch(this.serverUrl+this.endpoint+'/'+tourId,{
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify(updatedTour)
    })
    .then(response=>{
      if(!response.ok)
      {
        throw new Error('Request failed. Status: '+response.status);
      }
      return response.json();
    })
    .then(updatedTour=>{console.log("Updated tour: ",updatedTour)})
    .catch(error => console.error('Error', error.message));
  }
  deleteTour(tourId:number)
  {
    fetch(this.serverUrl+this.endpoint+'/'+tourId,{
      method:"DELETE",
      headers: {"Content-Type":"application/json"}
    })
    .then(response=>{
      if(!response.ok)
      {
        throw new Error('Request failed. Status: '+response.status);
      }
      console.log("Tour deleted");
    })
    
    .catch(error=>console.error('Error', error.message));
  }
  
}
