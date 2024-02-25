# Food Finder

Have you ever wanted to HAVE FOOOOOOD!???

Well, good news everyone. You can now FIND FOOOOOOD!!!

---

Food Finder is a website providing analyses.



## Vision

The prompt for this hackathon called for AI-powered innovation, requesting pioneers to utilize the power of AI in groundbreaking situations to revolutionize industries or transform society. We chose to respond to the prompt with the rather esoteric task: "Develop a tool that leverages the raw data sourced from CampusGroups to provide easy filtering to events that provide free food."

The initial intent was to provide a variety of filters for campus events, such as listing only charity events, upcoming sports games, band and theatre performances, for-fun events, etc. However, for the sake of developing a complete and polished full-stack project in the allotted time, the scope was narrowed to the most fun option of food-bearing events.

The format here is very powerful and very flexible. With knowledge of the exact data format and the exact characteristics we would like to extract, we can use example-based training of an LLM to be a reliable tool in our data processing pipeline. It would not be a substantial amount of work to widen the focus from food-specific to a more general, filter-agnostic backend framework.



## Structure

This repo is broken into three directories:

1. food-finder, a frontend webpage that displays a unified view of all upcoming events that provide food, making use of next-js, tailwind, and Material UI, and reading data from a MongoDB

2. event-collector, a backend application dockerized and hosted on an Amazon lambda service that automatically executes weekly, collecting data from CampusGroups, analyzing the data using OpenAI's API, and maintaining a MongoDB of

3. tuning, a one-off project that will tune an instance of GPT-3.5 Turbo through the OpenAI API to the specific task: given a campus event description, determine whether it contains food, which cuisine the food comes from, and other relevant information


## Learnings

The bulk of the engineering in this project is in the backend data collection and processing.

1. Auth & Puppeteer
2. WebScraping & JSDom
3. LLM Fine-tuning
4. MongoDB
5. Docker & AWS

