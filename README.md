# Wanderlust

This repo is a lightweight implementation of Wanderlust from the OpenAI DevDay.

![Demo](./public/wanderlust_demo.gif)

### Getting Started

Before we begin, you will need to prepare three environmental variables in the .env.local file:
`OPENAI_API_KEY`
`OPENAI_ASSISTANT_ID`
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`


#### Google Maps API

You will need to get a Google Maps API key to run the app. You can get one [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

You only need access to the Maps JavaScript API.

#### Assistant Settings

You can build an assistant in the OpenAI Playground with the following settings:

- Name: Wanderlust Lightweight
- Instructions: You are a highly sophisticated travel assistant that can write an execute code, and has access to a digital map to display information. When users say things like, "let's go to" or "go to" or similar phrases, understand that they want you to move the map center to be on those locations.
- Model: `gpt-4-1106-preview`
- Functions
  - See the directory `assistant-functions` in the code and copy the JSON for each function into the Playground.
  - `addLocationsToMap`
  - `changeMapCenter`
  - `changeMapZoomLevel`
  - `updateFlightInfo`
- Turn on:
  - Code Interpreter
  - Retrieval

Note the assistant ID (right below the name of the assistant in Playground) and your OpenAI API key, which you will need to run the app.

#### Update `.env.local`

Now that you have the keys, you can update the .env.local file with the keys you just got.

### Running the App

Execute the following commands to run the app:

```bash
npm install && npm run dev
```

That's it! You should be able to see the app running on http://localhost:3000.

### Contributing

If you would like to contribute to this project, please feel free to open a PR. I will review it as soon as I can.

### Contact Me

If you have questions, feel free to reach out to me on Twitter [@dane_albaugh](https://twitter.com/dane_albaugh).

### License

This code is licensed under the MIT License.
