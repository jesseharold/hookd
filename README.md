# Hookd

## User Stories
### Customers can…
	… perform an image search using a taxonomy of styles and hair types to filter images
	… save images they like to their favorites (if registered and logged in)
	… upload images of their own haircuts they have had and liked in the past
	… view portfolios for barbers at the shop
	… view availability of barbers on a calendar
	… book an appointment with a barber, and add to google calendar
	… share saved images with the barber so the barber knows what the customer wants
	… pay for appointment, add tip
	… leave a review for their barber
	… view their history of appointments

### Barbers can…
	… set their availability in a shared calendar
	… view upcoming appointments and the images the customer chose
	… upload pictures of their work 
	… view reviews left for them

### Barber Shop Admins can…
	… manage shop calendar
	… view payments and tips
	… manage reviews
	… add new barber users
	… communicate with customers


## Technology
* React: Manage views
* Mongoose: Store customer and barber data
* Passport: Manage logins for customers, barbers, and admins
* Bootstrap: Front-end layout
* JWT: Session management
* Stripe API: Process payments & tips from clients to barbershop/barber
* Google Calendar API: View barber availability, book appointments
* Google CSE and google-images node module: help customers choose a hairstyle

## DATABASE MODELS
* User
    * Role: [user, barber, admin]
    * Name
    * Email address
    * Cellphone (optional, for text reminders)
    * Password
    * Profile pic - a picture that identifies them
    * pastStyles [a list of styles that are uploaded selfies of the user's past haircuts]
    * likedStyles [a list of images that user saved as favorites]
    * Appointments [list of appointments that are this client]

* Appointment
    * Time and date
    * Client
    * Barber
    * Desired style [style chosen by client]

* Style
    * Image that represents this style
    * Name of style (optional)
    * Description (optional)

* Review
    * Client
    * Barber
    * Number of stars out of 5
    * Service received (style?)
    * text