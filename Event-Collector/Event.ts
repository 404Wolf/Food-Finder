// CaseEvent represents a parsed event loaded from the iCal
export interface Event {
    name: string, // "Case for a Cause"
    description: string, // "A charity event to raise money for the homeless"
    time: Date, // "2021-04-20T12:00:00Z" 
    bannerSrc: string, // "https://www.example.com/banner.jpg"
    caseID: string, // "wsm32"
    fetchedAt: Date, // "2021-04-20T12:00:00Z"
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
}
