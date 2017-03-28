# Hookd

A React App that allows customers at a barber shop to search for the perfect style, and then book and pay for an appointment. Increases customer loyalty and streamlines basic operations for a barbershop.

https://hookd-barbershop.herokuapp.com/

## User Stories
### Customers can…
	… perform an image search using a taxonomy of styles and hair types to filter images
	… save images they like to their favorites (if registered and logged in)
	… book an appointment with a barber
	… share saved images with the barber so the barber knows what the customer wants
	… pay for appointment, add tip
	… view their history of appointments
	
	features coming soon, customers can:
	… upload images of their own haircuts they have had and liked in the past
	… view availability of barbers on a calendar
	… view portfolios for barbers at the shop
	... add their appointments to their google calendar, ical etc.
	… leave a review for their barber
	... cancel or edit an appointment online

### Barbers can…
	features coming soon, barbers can:
	… set their availability in a shared calendar
	… view upcoming appointments and the images the customer chose
	… upload pictures of their work to their portfolio page
	… view reviews left for them

### Barber Shop Admins can…
	features coming soon, admins can:
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
* Google CSE and google-images node module: help customers choose a hairstyle

## DATABASE MODELS
* User
    * Role: [user, barber, admin]
    * Name
    * Email address
    * Password
    * pastStyles [a list of styles that are uploaded selfies of the user's past haircuts]
    * likedStyles [a list of images that user saved as favorites]
    * Appointments [list of appointments that are this client]
    * Profile pic (future)

* Appointment
    * Time and date
    * Client
    * Barber
    * Desired style [style chosen by client]
    * review left - # of stars (future)
    * review left - text of review (future)

* Style
    * Image that represents this style
    * Name of style
    * Note
