# Frontend Walkthrough

This is a full presentation of all frontend screens and functionalities of our application:  

### Landing Page    

Once the website is loaded, the landing page appears, from where the user can choose to either login (with a Solvio or Google account) or register (create a new account). Depending on what he chooses, he is navigated to either the login or the register page. The user can also be redirected to the GitHub repository of this project by clicking the respective button.  

![342446127-8dfc4eee-ab3d-465e-98f4-a5fb5ac49d4e](https://github.com/user-attachments/assets/29fbed99-b485-4b4f-a555-128c6c8cf213)


### Login/Register  

The user can login to his account through the following page by filling in his credentials. We also support logging in through a google account as can be seen below, by pressing the **Sign in with Google** button:  

![342089877-7e8f9ab0-0abb-4fbd-a3eb-e54c55353cd0](https://github.com/user-attachments/assets/e603a8ea-6504-45cd-a44a-a6842ea8f364)

If the user doesn't have an account he can hit the register button and the following page will be loaded. The user can then choose a username and a password, verify the chosen password and proceed to create an account:  

![342089937-80546c87-67bc-4fd8-8aeb-2936924285be](https://github.com/user-attachments/assets/fedd60b4-2911-4bc8-b85a-8a231b17aaa4)


### Home Page  

The home page of the user consists of a list of all of his submissions along with information about each and every one of them, actions that can be performed to each submission and other buttons that will be explained later on. Below, one can find a snapshot of the home page. Each submission to the solver comes with the following information and buttons:  
- the name of the submission (by pressing the up-and-down arrows next to the name column, one can sort the submissions alphabetically by name)
- the date the submission was first created
- the submission's status. When a submission is created, it's status automatically becomes **ready**. When the user presses the **Run** button corresponding to this submission, the submission is submitted to the solver and while it is being solved, the status becomes **running**. When the solver has successfully returned the solution, the status becomes **finished**.
- the **View/Edit** button. If a problem hasn't been sent to the solver yet, the user can edit the problem by pressing the button. In all cases, one can view the problem's input data by pressing this button.
- the date the submission was last updated (by pressing the up-and-down arrows next to the last updated on column, one can sort the submissions alphabetically by date of last update)
- the **Run** button to send the problems to the solver
- the **View Results** button to view the results the solver has returned (the user can only press it if the status of the submission is **finished**).
- the **Delete** button to delete a particular submission (irreversible action).

![342090877-74030d33-4ae7-48e5-8217-b68534948952](https://github.com/user-attachments/assets/710ab0e5-034f-49b9-8d67-4a73d53af3f6)


Apart from the submissions information and control described above, the home page also has the following functionalities:  
- the **Filter Options** button. By pressing it, the user can filter which submissions will be shown in the home page, according to their status (e.g. Make only the submissions whose status is **finished** visible):
![342091105-5d5d8d24-1c03-47a1-83e3-b41902d07b10](https://github.com/user-attachments/assets/e7759b9c-77ee-416b-aad2-ae45d21b98dc)


- a **Search Bar**. The user can search for a particular problem by typing its name there. As the user is typing, only the problems with names that contain the typed characters will appear and when the user has finished typing, only the problems whose names contain the typed characters will be visible.

- the **Submit new problem** button. By pressing it the user is navigated to a new page where he can submit a new problem. Once navigated there, the user must choose which solver's model he wants to utilize (as of now, only the Vehicle Routing Problem has been implemented as explained in the main README). Afterwards, the user will have to upload the two necessary files using the Drag & Drop method and specify the number of vehicles, the depot, the maximum distance of each vehicle and the name of the problem. He can then create the problem:

![342094601-e9c12ea2-c135-44e1-b780-130603c1242f](https://github.com/user-attachments/assets/9437af3d-06c7-407f-85c6-39a33ea7f2e0)


By pressing the **Open Script**/**Open Input Data File** buttons, the user can view the input files he just uploaded:  

![342099373-cb7d22da-e9cf-491c-9c29-d9a7174e44c0](https://github.com/user-attachments/assets/b9a0a3a3-6f06-4ef1-a5c6-dfc4f3d3d10b)


- the **View/Edit** button of each submission. By pressing this button the user can edit the submission he selected (only before officially submitting it to the solver) and also view that submission's input data (at all times). The user is navigated to a very similar page to the problem submission one, albeit with all input information already filled in as per the previous input data the user had specified for this problem. The user can change (or view) whatever he likes and update the problem:

![342096077-171dac49-4561-4462-8391-982a3e975ac6](https://github.com/user-attachments/assets/94c0b6b7-9219-4ea4-8045-d7ef9d3398fc)


- the **View Results** button of each submission. By pressing this button the user can view the results of the submission he selected. The user is navigated to a new page that contains the results in a table format: each row corresponds to one particular vehicle and contains the vehicle number, the distance of the route it must perform and a button to see that route according to the solver's solution:  

![342096890-d9cdaa13-5017-472b-b48e-6c479b207a81](https://github.com/user-attachments/assets/4c5e9160-20e9-4cce-ae04-ac63723145e0)


The user can then click the **Click to see route** button of a vehicle and the route that this vehicle must perform will appear in a pop-up window in a graph format for the user to see. The graph's nodes represent the locations this vehicle must visit and the edges indicate the order with which the vehicle must visit these locations. An example can be seen below (the starting node here is node 0):  

![342098160-1109eae6-11fc-4e00-8af9-0f392b1fc4e7](https://github.com/user-attachments/assets/80daf08a-35e4-4aa7-aff0-cad5e46bb25a)


Finally, by clicking the File icon, the user can view the solver's raw answer as it is returned by the solver and download it (in .txt format) by pressing the **Download** button:  

![342098545-c8c13986-ba05-4264-8438-788689eba044](https://github.com/user-attachments/assets/2a8133e6-4f39-4e64-a9f4-a63007b1b548)


- the **username icon**. By pressing it the user can view how many credits he has and also buy more credits using **PayPal**:

![345086579-521f016a-b99b-4966-aa82-5da8aca9ef76](https://github.com/user-attachments/assets/c6377634-37a0-4885-b280-9d29276fcbdb)

The user can specify the amount of credits he wants to purchase and then hit the **PayPal button** in order to pay. He will then be redirected to a PayPal Sandbox to finalize the purchase:   


![342099155-35bd7dea-12f9-4429-b207-e68e4f074978](https://github.com/user-attachments/assets/5c0fb2f9-6ad8-462f-bb50-258fa7756ff6)

- the **healthcheck icon**. By pressing it, users and admins alike can see which microservices are up and running and which ones aren't. Since the application is based on a microservices architecture, if one microservice is down, the rest of the application can continue operating. In the example below, the user can see that the statistics microservice is down while the rest of the microservices funtion properly.

![345086171-f73fbfdd-c01a-4f1a-8b2e-78f4feba2776](https://github.com/user-attachments/assets/5a9fb48d-bbec-4627-89aa-8ec1ae51091e)

### Admin's functionalities  

The admin's home page is really similar to the user's one. The main differences are that the admin can view every single problem submitted by any user, alongside the id of the user that submitted it and of course cannot run or edit the problems, since they don't belong to him. Furthermore, the admin can view some information about the user that has submitted a problem by clicking on that user's id. The pop-up modal that appears can be seen in the example below:  

![345089775-3ddbc138-caa5-4c55-b009-ea32ef61197a](https://github.com/user-attachments/assets/866fb7b1-c17b-4fd0-b7a7-c283a417d9e1)


Moreover, the admin can view some **statistics** regarding the problems that have been submitted and the system's state by pressing the **View Statistics** button from their main page. The statistics that are gathered and displayed are the following ones and can be seen below:  

- The total number of problems solved (plus the new problems solved today)
- The average execution time of the problems that have been solved
- the length of the RabbitMQ queue that contains the problems that are waiting to be submitted to the solver
- a graph displaying the total number of problems solved for each hour of every day. One can also see the daily average of the problems solved (taking into account the hours when a problem has been submitted).
- a graph showing the distribution of problems according to their execution time.

![345868686-a8720380-ef87-4501-bf5e-5d0b9bdeda97](https://github.com/user-attachments/assets/72aeb75b-0090-4a77-93d1-7d4e394efb5b)

### Emails  

Last but not least, the user can receive two kinds of **emails** to his personal Google email (provided he has logged in with his Google account to Solvio):

- a welcome email the first time he logs in to Solvio that can be seen below:

![345084738-2d3313e1-5880-4bea-b590-bcb7fb429843](https://github.com/user-attachments/assets/fab3c750-9776-4d54-a844-15670001a4db)


- an email that notifies the user that a problem he has submitted to Solvio has been solved. This email also includes a link to the page containing the answer to this particular problem:


![345084838-c4c34122-7ca7-4e43-bd89-7748c101c294](https://github.com/user-attachments/assets/4a44cf35-4591-4e9f-bfa5-334b4f54aacb)







