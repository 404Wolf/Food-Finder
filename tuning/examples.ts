export const prompt = `Your job is to read the description of a student-run event located at a local university, and determine whether the event provides food or not to people attending the event. You are also tasked with rating the food on a scale from 1 to 10, with 1 representing cheap canned food and 10 representing a fully prepared feast. If no part of the event mentions food, rate the food a 0. If there is food provided, to classify what cuisine the food is, which MUST be one of the following values: Pizza, Beverages, Cultural, Healthy, Sweets, Unknown, and None. Additionally, indicate whether this event is for volunteers or is offering food to the community. If it is, say true, otherwise if it is not or if taking food, say false. Additionally, indicate whether the location is on the university campus, or requires traveling off campus, also true or false (say true if it is unknown). Output each of these fields in a JSON object with the fields "rating", "cuisine", "volunteer", and "onCampus"`;

export const examples = [
    {
        description: "This is a Group Meeting",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },

    {
        description:
            "Scheduled, 30 minute, 1:1, confidential Zoom consultation with Director of Clinical Counseling Services, Equity, & Inclusion, Naomi Drakeford, Ph.D. or an in-person consultation with Multicultural Specialist",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },

    {
        description:
            "For this month's coffee-tasting event, we are featuring a Japanese-style dark roast coffee on espresso: Project X by Sawada Coffee! Founded by Hiroshi Sawada, Sawada Coffee took inspiration from Sawada's time in a Tokyo cafe, during which he secretly worked on a coffee blend that reflected a classic, Japanese flavor profile (hence the name Project X).",
        rating: "6",
        cuisine: "Beverages",
        volunteer: "false",
        onCampus: "true",
    },

    {
        description:
            "Join the African Student Association at our annual Karaoke event, Battle of the Mics, where you can watch and/or sing your favorite African songs, from Afrobeats to Amapiano! Enjoy lighthearted competition, great music, delicious food, and an incredible time to start off the spring semester.",
        rating: "7",
        cuisine: "Cultural",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Join us for Grind training on the FAB floor at think[box]. Proper PPE is Required [short sleeves, long pants, close-toed shoes, hair tied back, no jewelry An ability badge is required to complete this training. If you do not yet have an ability badge, you will need to complete a 15-minute safety tour prior to your training time",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Brew CWRU is hosting a field trip to Cleveland's very own Phoenix Coffee Co's HQ in downtown Cleveland! During this field trip, Phoenix Coffee's director will take us through various processes of QA/QC in specialty coffee including cupping, roasting, and dialing in a coffee recipe. Spots are limited due to transportation, so make sure you can commit to the registration and do not miss out on this amazing opportunity!",
        rating: "4",
        cuisine: "Beverages",
        volunteer: "false",
        onCampus: "false",
    },
    {
        description:
            "Trinity Cathedral created the lunch program, A Place at the Table, to serve those in need in the Cleveland downtown area, and this program has never missed serving a Sunday lunch in nearly 40 years. A Place at the Table is the only lunch program that serves those in need on Sunday afternoons in the downtown area. Volunteers will assist in serving lunch to guests.",
        rating: "2",
        cuisine: "None",
        volunteer: "true",
        onCampus: "false",
    },
    {
        description:
            "Leaf your worries behind and join UPB for our UPBud plant-themed event! Decorate plant pots, bring home some soil and seeds, enjoy plant-themed treats, and more on Sunday, 2/25 1-3pm in Thwing ballroom. CG registration open Monday, 2/12 at 5PM- we'll see you then‼️",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Come and enjoy the under the sea with UPB at the Cleveland aquarium! Registration will open 2/16 at 7PM! Transportation will be provided.",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "false",
    },
    {
        description:
            "Come join us to listen to guest speaker and preacher Dr. Reggie Williams over social ethics in Christianity. Dr. Williams received his Ph.D. in Christian Ethics at Fuller Theological Seminary in 2011. He earned a Master's degree in Theology from Fuller in 2006 and a Bachelor's degree in Religious Studies from Westmont College in 1995. He is a member of the board of directors for the Society for Christian Ethics, as well as the International Dietrich Bonhoeffer Society. He is also a member of the American Academy of Religion and Society for the Study of Black Religion. Lunch is provided for at 11:30 A.M.",
        rating: "7",
        cuisine: "Unknown",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Join us to make Japanese fruit sandwiches (fruit sando) and milk tea! Registration is required",
        rating: "8",
        cuisine: "Cultural",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description: "Quidditch Practice ",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Join us this Sunday (2/25) for a guided Doan Brook hike! We will be meeting at 2 pm in the upstairs section of Fribley. The hike will be approximately 2 miles long. Bring boots if you have them as it might be muddy.",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "false",
    },
    {
        description:
            "NSA presents the first edition of The Black History Month Brunch: Honeyed Hues. Free up your schedule and come enjoy wonderful performances from each Black Student Org along with good food and great company. The dress code is shades of brown and nude, so attend in your best attire as we travel down the history of Black Excellence. The brunch will be on February 25 at 3pm in the Linsalata Alumni Center - Foster-Castele Great Hall.",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Chuck Wagon Community Meals need volunteers from 4-7 pm , for either opening or closing shift the last Thursday of the month. Thursday January 25th , February 29th , March 28th and April 25th . Our program serves hot meals in Dowd Commons of Church of the Covenant. If you would like to help with either preparing the meal, greeting guests, serving food, or assisting with clean-up, we’d love to have you join our fun, hardworking crew. We can promise both delicious meals and delightful company. These meals are offered free to the community, however good will offerings are also graciously accepted. For this month, if you would like to volunteer, please contact Katherine Chilcote through email kchilcote@covenantweb.org",
        rating: "4",
        cuisine: "Healthy",
        volunteer: "true",
        onCampus: "true",
    },
    {
        description:
            "Each week donations have been available through our partnership with the Hunger Networks Food Rescue Program. 40 % of American's food goes to waste, while 1 in 6 people go hungry right here in Cuyahoga County. Through this partnership we accept extra food from Whole Foods, Giant eagle and Get Go to be distributed to those in need.",
        rating: "3",
        cuisine: "Healthy",
        volunteer: "true",
        onCampus: "true",
    },

    {
        description:
            "Need some volunteering hours or you are passionate about serving the student community? come volunteer with us at the PRC. Your involvement as a volunteer not only enriches the lives of students but also strengthens the fabric of our community as a whole by developing new skills and making impacts!",
        rating: "0",
        cuisine: "None",
        volunteer: "true",
        onCampus: "true",
    },
    {
        description:
            "A general body meeting for SEDS CWRU. We'll be going over recent news and upcoming events in the club.",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description: "Our first roundtable of the semester covering alcohol abuse.",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Come join the club volleyball team every Monday and Wednesday from 8:30-10:30 for practice in Adelbert Gym",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Come and assemble a cute bag/basket of pregnancy tests, plan B, ibuprofen, dental dams, CWRU repro health resource cards, PPGEN stickers, candy, condoms, and more! Free insomnia cookies will also be provided.",
        rating: "9",
        cuisine: "Sweets",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "What does it take to create adaptable teams in the future?  How will they be staffed, designed, and upskilled against rapid tech movements, growing regulation, and security challenges?  How will current SaaS solutions integrate with emerging, federated data solutions driven by data monetization? Join xLab as we explore these questions with our panelists from academia and industry. Our speakers include Zach Warren, Manager for Enterprise Content for Technology & Innovation, Thomson Reuters; Amie Richards, senior manager for technology at West Monroe; and Lakshmi Balasubramanyan, Associate Professor, Banking and Finance at Weatherhead School of Management. Listen to xLab associate director of corporate engagement and moderator for this panel, Mark Dangelo, discuss this topic. https://youtu.be/TiODgdUVJh4",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "You've heard of ChatGPT, but there are dozens of similar tools available.  What are they? How do they work? How do you know which one is right for you?",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Join us at west side community house as we host a workshop for elementary school students",
        rating: "0",
        cuisine: "None",
        volunteer: "true",
        onCampus: "true",
    },
    {
        description:
            "Come to the Physics Undergraduate Lounge for bomb-themed board/party; games with FREE food from Sittoo's. We will have Exploding Kittens, Secrete Hiter, Jackbox, and more!",
        rating: "8",
        cuisine: "Cultural",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "This session we will be enjoying the comforts of food along with learning culinary vocabulary from various languages.",
        rating: "9",
        cuisine: "Cultural",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description: "6:30-8:30 in Adelbert gym",
        rating: "0",
        cuisine: "None",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description:
            "Join us at the Linsalata Alumni Center for a discussion on cardiovascular disease in Ohio where we will explore preventive care, health disparities, and possible solutions with experts in these fields to alleviate this major urban health issue. Catered food from Bon App&#233;tit will be provided at the event!",
        rating: "5",
        cuisine: "Healthy",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description: "Mocktail party!",
        rating: "7",
        cuisine: "Beverages",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description: "A super bowl watch party, with pizza, drinks and other snacks provided.",
        rating: "7",
        cuisine: "Pizza",
        volunteer: "false",
        onCampus: "true",
    },
    {
        description: "pizza",
        rating: "8",
        cuisine: "Pizza",
        volunteer: "false",
        onCampus: "true",
    },
];
