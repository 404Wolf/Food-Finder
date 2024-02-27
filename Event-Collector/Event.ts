interface fetchedAt {
    fetchedAt: Date;
}

// Event represents a parsed event loaded from the iCal
export interface IcalEvent extends fetchedAt {
    _id: number; // "1234567890"
    name: string; // "Case for a Cause"
    description: string; // "A charity event to raise money for the homeless"
    date: Date; // "2021-04-20T12:00:00Z"
    bannerSrc: string; // "https://www.example.com/banner.jpg"
    location: {
        "@type": string;
        name: string; // "123 Main St."
        address: string; // "San Francisco, CA 94105"
    };
}

// Food represents a parsed response from the AI, evaluating the quality of food provided at the event
export interface FoodInfo extends fetchedAt {
    rating: number; // 1-10
    description: string; // "cheap snacks" or "fully prepared feast"
    cuisine: string; // "Italian" or "Mexican"
    volunteer: boolean; // true or false
}

// Event represents a pair of Event and Food, for spending to the front end
export interface Event extends IcalEvent {
    food: FoodInfo; // A Food object
    onCampus: boolean; // true or false
    fetchedAt: Date; // "2021-04-20T12:00:00Z"
}
