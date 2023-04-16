## Application features

- The app is a mobile-first project, supporting both mobile and desktop dimensions.
- Unauthorized users can
    - Access the landing page.
    - Sign up/in to the app.
- Application uses JWT to authenticate users.
- Logged users can
    - Access list, details, and favorites pages
    - Can add/remove items to/from the favorites page.
    - Can use a quick search bar for filtering list items.
    - Can log out from the app.
    - Can control the app's theme (light/dark).
    - Can select primary color of application theme.
- Application uses a REST API to retrieve data.
- Aplication uses lazy loading for modules.
- The app is built using NgRx to manage the state of favorite books.
- The app is built using Tailwind for UI components.
- An authentication module implemented with Node.js.
- The app is built following Test-Driven Development (TDD) principles.

### Before running the application
## Installation backend
1. You need to have Node.js installed on your machine.
2. You need to run the backend application.
3. Clone the repository
    'git clone https://github.com/KosiAl/DemoProjectBE.git'
4. Go to folder
    'cd DemoProjectBE'
5. Install dependencies
    'npm install'
6. Run the app
    'npm run start'

## Installation frontend

1. Clone the repository
    'git clone https://github.com/KosiAl/DemoProjectFE.git'
2. Go to folder
    'cd DemoProjectFE'
3. Install dependencies
    'npm install'
4. Run the app
    'npm start'

## Application flow
1. By default the application will run localhost:4200. Navigating to this address will automatically redirect you to the landing page. (localhost:4200/home)
2. You can navigate to the login page by clicking the LOGIN button in the header.
3. If no user is registered, you can navigate to the register page by clicking "register new user" text.
4. After successful registration, you can login with the new user by clicking "login if you have account".
5. After successful login, you will be redirected to list page where you can view list of books.
6. You can filter books by typing in the search bar. Search will be performed on all fields of the book.
7. You can sort the list by clicking on the column name. First click will sort the list in descending order, second click will sort the list in ascending order. Third click will reset the sorting.
8. On the left side of the table, you can see checkboxes. These checkboxes are used to add/remove books to/from favorites.
9. If you click on the book name, you will be redirected to details page where you can view more information about the book.
10. Books can be added to favorites from details page.
11. Favorites page can be accessed by clicking on the FAVORITES button in the header.
12. Removing books from favorites will adjust the total page number and reflect the state in the list page (inside the table)

## Bonus features
1. User can change the theme of the application by clicking on the theme button on the sidemenu.
2. User can change the primary color of the application by clicking on the color button on the sidemenu.

## Testing
1. Run 'npm run test' to run all tests.
