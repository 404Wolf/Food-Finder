# Food Finder

Have you ever wanted to HAVE FOOOOOOD!???

Well, good news everyone. You can now FIND FOOOOOOD!!!


## Vision

The prompt for this hackathon called for AI-powered innovation, requesting pioneers to utilize the power of AI in groundbreaking situations to revolutionize industries or transform society.

We chose to respond to the prompt with the rather esoteric task: "Develop a tool that leverages the raw data sourced from CampusGroups to provide easy filtering to events that provide free food."

The format here is very powerful and very flexible. With knowledge of the exact data format and the exact

Other tasks in the same vein:

The initial intent was to provide a variety of filters for campus events, such as listing only charity events, upcoming sports games, band and theatre performances, for-fun events, etc. However, for the sake of resulting in a complete
and in the spirit of free food :D


## Structure

This repo is broken into three directories:

1. food-finder, a frontend webpage that displays a unified view of all upcoming events that provide food, making use of next-js, tailwind, and Material UI, and reading data from a MongoDB

2. event-collector, a backend application dockerized and hosted on an Amazon lambda service that automatically executes weekly, collecting data from CampusGroups, analyzing the data using OpenAI's API, and maintaining a MongoDB of

3. tuning, a one-off project that will tune an instance of GPT-3.5 Turbo through the OpenAI API to the specific task of: given a campus event description, determine whether it contains food, which cuisine the food comes from, and other relevant information


## Learnings
