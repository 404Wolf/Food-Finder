// CaseEvent represents a parsed event loaded from the iCal
export interface CaseEvent {
    _id: number,
    name: string,
    description: string,
    time: string,
    bannerSrc: string,
}

// FoodInfo represents a parsed response from the AI, evaluating the quality of food provided at the event
export interface FoodInfo {
    rating: number; // 1-10
    description: string; // "cheap snacks" or "fully prepared feast"
    cuisine: string; // "Italian" or "Mexican"
    volunteer: boolean; // true or false
}

// Event represents a pair of CaseEvent and FoodInfo, for spending to the front end
export default interface Event {
    foodInfo: FoodInfo,
    event: CaseEvent
}
