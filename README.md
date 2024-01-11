# petstore-rest

A little repo with bunch of tests of https://petstore.swagger.io/ api using `jest` and `supertest`.

Use `yarn` or `npm install` to install dependencies, then `yarn test` or `npm` test to run tests.

## Approach and explanation

There are few tests that checks basic functionalities of `/pet`. There are two tests at the very beginning that verifies if `POST` request is processed correctly. Ideally, every single endpoint and method should be tested that way, using incorrect or empty data. As I noticed that there is no real validation or processing on server side, I have not implemented any more test scenarios, but they would look like the ones I provided.

In other test cases I focused on main purpose of each method in `/pet` endpoint (GET, PUT, POST, DELETE) with verification if the data are saved correctly. I used only `name` and `availability` fields, all other data could be tested the same way. Before each test, new "pet" is created using `POST /pet` to make sure fresh data is provided for each test.

In my opinion tests (and any code) should be clean and as simple as possible. Because of that I decided not to use Cucumber. Cucumber adds additional layer of abstraction, which in case of such simple example as this one is overkill. I could find Cucumber useful in case if we don't have real documentation or test cases written down elsewehere and Cucumber scenarious would become our documentation. In this particular example documentation is available in swagger and test cases are pretty self-explanatory.
