<p align="center"><img src="./src/assets/nba_logo.svg" width="300"></p>

<div align="center">

<a href="">[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-success?style=flat-square&logo=codesandbox)]()</a>

</div>

A React front-end application for making restaurant reservations.

The Little Lemon Booking App allows users to reserve a table at a restaurant. It provides a clean responsive interface that includes form validation and accessability features to provide an inclusive user experience.

## Implementation Details

This document features the final project for [Meta's Front-End Developer Professional Certificate](https://www.coursera.org/professional-certificates/meta-front-end-developer).

The project started by planning the UI/UX, taking into account a list of client's requirements. A wireframe was developed using [Figma](https://www.figma.com/), followed by a mock-up, that adhered to the provided [Brand Style Guide](./src/assets/ui_kit.svg). I establishing typographic hierarchy and resorted to permissible color palette, designing a clean modern interface.

Emphasizing the project structural foundation, I have focused on semantic HTML5 tags and [Open Graph Protocol](https://ogp.me/) settings. This ensured solid foundation for the functionality of the project.

The project core functionality is a form table reservation system. The data validation was implemented using a combination of HTML5 validation and controlled component validation, with the latter allowing button submission only when all required inputs are filled. The specific input type validations are then handled by HTML5, adding an extra layer of validation. When the data is validated, it adds data to the local storage and redirects to a confirmation page with 'useNavigate'. Unit tests were implemented using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

This project showcases the skills and knowledge gained throughout the program, specifically: UI/UX design, semantic code structure, data validation, [React's](https://react.dev/) component creation and organization, and unit testing.

## Usage

The main functionality of the reservation system revolves around three components: 'BookingForm', 'DataContext' and 'ConfirmationPage'.

1 - BookingForm

- This component uses the 'useDataContext' custom hook to access shared data, including the 'availableTimes' and the other 'formState'data values. The 'handleDateChange' function uses the dispatch and reducer function to update the values returned by the API.

- A 'submitForm function' is called when the form is submitted, which sends the form data to a mock 'submitAPI' call.

2 - DataContext

- It initializes the 'availableTimes' function state by making an API call that fetches available times for table reservations.

- The 'availableTimes' state is managed by using the 'updateTimes' reducer function, which is called when the dispatch function is invoked.

3 - ConfirmationPage

- This component retrieves stored form data from 'localStorage' and displays the confirmation details after a successful reservation.

- It provides a link to the homepage using the 'Link' component from [react-router-dom](https://www.npmjs.com/package/react-router-dom)

> **! Note**
>
> Production build on the dist folder.

## Development

To install the component, clone repository, change into directory on the terminal and install with npm.

```bash
git clone https://github.com/kevinsilva/little-lemon
cd little-lemon
npm install
```

To run the application.

```bash
  npm run start
```

To run the tests.

```bash
  npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
