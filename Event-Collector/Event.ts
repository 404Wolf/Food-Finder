import { ObjectId } from "mongodb";

// CaseEvent represents a parsed event loaded from the iCal
export interface Event {
    _id: ObjectId,  // "1234567890"
    name: string, // "Case for a Cause"
    description: string, // "A charity event to raise money for the homeless"
    date: Date, // "2021-04-20T12:00:00Z" 
    bannerSrc: string, // "https://www.example.com/banner.jpg"
}

// FoodInfo represents a parsed response from the AI, evaluating the quality of food provided at the event
export interface Food {
    rating: number; // 1-10
    description: string; // "cheap snacks" or "fully prepared feast"
    cuisine: string; // "Italian" or "Mexican"
    volunteer: boolean; // true or false
}

// Event represents a pair of CaseEvent and FoodInfo, for spending to the front end
export interface FoodEvent {
    food: Food,
    event: Event
    fetchedAt: Date, // "2021-04-20T12:00:00Z"
}
