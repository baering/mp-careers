## Install

- Install latest version of [NodeJS](https://nodejs.org/en/download/)
- `npm i`

## Running the project
The project is split into two parts

### Fetcher
Fetches the data

- `npm run fetcher`
- which generates:
  - `careers.json`
    - an array of objects with MP info, each one storing:
      ```
      {
        "mpId": ...,
        "name": ...,
        "dateOfBirth": ...,
        "career": ...,
        "mpStartYear": ...,
        "mpEndYear": ...
      }
      ```

### Processor
Processes the data

- `npm run processor`
- which generates:
  - `careers-by-year.json` summary by year
  - `careers-with-guess.json` extra field added to `careers.json` with a main career guess
  - `/csv` all the data in a csv format
  - `/visualized` html files with a d3 graph of each career type visualized over time
