# Food Finder
## Authored by Wolf Mermelstein, Eric, and Mark

Have you ever wanted to HAVE FOOOOOOD!???

Well, good news everyone. You can now FIND FOOOOOOD!!!

---

Food Finder is a website summarizing all CWRU CampusGroups events that provide food, presenting them in a clean and digestible webpage.


## Vision

The prompt for this Hackathon called for AI-powered innovation, requesting pioneers utilize the power of AI in groundbreaking situations to revolutionize industries or transform society. We chose to respond to the prompt with the rather esoteric task: "Develop a tool that leverages the raw data sourced from CampusGroups to provide easy filtering to events that provide free food on campus," in part inspired by the large amount of free food provided to us at the Hackathon itself.

The initial intent was to provide a variety of filters for campus events, such as listing only charity events, upcoming sports games, band and theatre performances, for-fun events, etc, using OpenAI's natural language processing for categorization. However, for the sake of developing a complete and polished full-stack project in the allotted time, the scope was narrowed to the most fun option of food-bearing events.

The format here is very powerful and very flexible. With knowledge of the exact data format and the exact characteristics we would like to extract, we can use example-based training of an LLM to be a reliable tool in our data processing pipeline. It would not be a substantial amount of work to widen the focus from food-specific to a more general, filter-agnostic backend framework.



## Structure

We decided to write our project in `Typescript` using the `NextJs` framework to more easily integrate a `React` frontend with an `express` backend. We used `Mui` and `Tailwind` to improve styling and add widgets to our UI, and OpenAI's APIs and tools to perform event classification. Moreover, for authing into Case's event system on CampusGroups we used a headless chromium instance managed by `Puppeteer`.js.

This repo is broken into three directories:

1. `food-finder`, a frontend webpage that displays a unified view of all upcoming events that provide food, making use of next-js, tailwind, and Material UI, and reading data from a MongoDB

2. `event-collector`, a backend application dockerized and hosted on an Amazon lambda service that automatically executes weekly, collecting data from CampusGroups, analyzing the data using OpenAI's API, and maintaining a MongoDB of

3. `tuning`, a one-off project that will tune an instance of GPT-3.5 Turbo Chat Completions AI model through the OpenAI API to the specific task: given a campus event description, determine whether it contains food, which cuisine the food comes from, and other relevant information. It also teaches the model to respond with a well-formatted `.json`.


## Learnings

The bulk of the engineering in this project is in the backend data collection and processing.

1. Auth & Puppeteer
2. WebScraping & JSDom
3. LLM Fine-tuning
4. MongoDB
5. Docker & AWS

