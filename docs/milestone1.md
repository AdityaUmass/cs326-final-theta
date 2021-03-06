## Team Name
Theta

## Application Name
UFit

## Team Overview
Name: Aditya Kumar Roy Chowdhury, GitHub username: AdityaUmass\
Name: Raghav Malpani, GitHub username: raghavmalpani\
Name: Brandon Figueredo, GitHub username: Brandredo

## Labor Division Breakdown
Aditya: "Create a Post" page, Home/Posts page, Navbar contributions\
Raghav: Log in page, Sign up page, Account page\
Brandon Figueredo: Clubs and News page, Navbar page and formatting

General styliing done by all.

## Data Interactions and Important Data components
There have been updates and clarifications to the data interactions and components presented in Milestone 0
* Home Page: The Home-page is the page where people will find others like them. People will be able to posts by other people
who want to find workout partners and they can even filter the posts to find a good match for them. People can interact with the posts by clicking an "I'm interested" button.
* Create a Post page: This is the place where people can create posts/make requests and specify certain aspects of their activity such as the duration and the day.
* Clubs and News page: This page contains a list of fitness clubs as well as popular sports news from the campus.
* Account Page: This page was chosen in place of the highlights page. It offers people the chance to view their own posts as well as see the people interested in their posts and send those people emails if necessary. Users can also delete their own posts if required.
* Log in/Sign Up: Log in and Sign up have been implemented as Bootstrap modals containing forms that pop-up once the Log In and Sign up buttons are clicked in the navbar.

Important Data:
* Posts
    * Date
    * Activity Type
    * Workout Type
    * Workout Duration
    * Workout Start Time
    * Days
    * Content
    * Title
    * Contact Information
* User information
    * Login Email
    * Name (Optional)
* Clubs
* News
* Workout/Activity Filters (As mentioned in post data - Activity Type, Workout Type, Workout Duration, Workout Start Time, Days, Date)

## Wireframes

### My Account
![Account Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/MyAccountWireframe.PNG)
The my account web page allows a signed-in user to see the posts that they have uploaded to the website. Apart from just viewing their posts, this webpage allows users to update, delete, and even see the other users who have shown an interest in the activity. The user can see the emails of each post's interested users and send them a bulk email via a modal.  

### Clubs + News
![Clubs Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/club-wireframe.png?raw=true)
This is the Clubs and News page. It provides users with news of current sports and recreation events, such as football games, club events, and club events, which are currently happening on campus during the week or month. It also contains a collection of UMass athletics clubs available for students to join. It display each clubs contact information as well as their social media links.

### Home/Posts page
![Home/Posts Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/PostpageWireframe.png)
This shows the general layout of the home page which also shows the posts from our users. On the left, the filters stay fixed in place so that you can change the types of posts you see based on their characteristics (Workout Type, Day, Duration, etc). When you click "Single Day Activity", an input will be toggled asking to specify the date of the activity. When you click "Repeated Activity", It will ask you two pick days from a set of days provided. On the right, you can freely scroll the relevant posts based on filters you set or otherwise. You can also interact with the posts by clicking a button to show you are interested, which will reflect in the Accounts page of whoever made that post as well as increment the displayed value for number of people interested.

### Make a Post page
![Make a Post Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/MakePostWireframe.png)
This is the page where users can make a post that will be displayed on the Home page. As can be seen, apart from title and content, there are also multiple specifiers such as Activity Type and Workout Type that show up as filters on the home page. When you click "Single Day Activity", an input will be toggled asking to specify the date of the activity. When you click "Repeated Activity", It will ask you two pick days from a set of days provided. After setting the filters, filling in the content, and specifying contact information, you can make the post and the home page will be updated.

### Navigation Offcanvas
![Navigation OffCanvas Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/navigation-wireframe.png?raw=true)
The Offcanvas is a sidebar menu built into every page of the website. It provides easy navigation to other pages.

### Login
![Login Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/signInwireframe.png)

The login page is a modal that takes two inputs from a user: their email and their password. Additionally, the login page has a button that would link the user to the create page modal.

### Sign Up
![CreateAccount Wireframe](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/createAccountwireframe.png)

The sign up page is a modal that takes three inputs from the user: their name, email and their selected password. Once inputted, the user can go ahead and create their account.

## Mockups

### Home/Posts page
Home Page
![Home Image 1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/HomePage.png)

Home Page with Single Day Activity Toggled
![Home Image 2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/HomePage1.png)

Home Page with Repeated Activity Toggled
![Home Image 3](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/HomePage2.png)

### My Account
Page View
![Account Page](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Accounts.png)

View of popup that displays interested people for a specific post
![Account Page 2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/InterestedPeople.png)
### Navigation Offcanvas

### Make a Post page
Post Page with Navbar
![Post Image 1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/PostPage1.png)

Full Post View
![Post Image 2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/PostPage2.png)

Post Page with Single Day Activity Toggled
![Pst Image 3](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/PostPage3.png)

Post Page with Repeated Activity Toggled
![Pst Image 4](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/PostPage4.png)

### Clubs + News
![Club Image 1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/screenshot.png)
![Club Image 2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/screenshot2.png)

### Login
![Log in Popup](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Log%20In.png)

### Sign Up
![Sign in Popup](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Sign%20up.png)

### Offcanvas Navigation Sidebar
![Offcanvas](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/navmenu.png)


