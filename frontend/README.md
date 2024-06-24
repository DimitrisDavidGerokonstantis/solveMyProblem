# Frontend Walkthrough

This is a full presentation of all frontend screens and functionalities of our application:  

### Landing Page    

Once the website is loaded, the landing page appears, from where the user can choose to either login (with a Solvio or Google account) or register (create a new account). Depending on what he chooses, he is navigated to either the login or the register page. The user can also be redirected to the GitHub repository of this project by clicking the respective button.  

![landing page](https://github.com/ntua/saas2024-19/assets/115417360/8dfc4eee-ab3d-465e-98f4-a5fb5ac49d4e)

### Login/Register  

The user can login to his account through the following page by filling in his credentials. We also support logging in through a google account as can be seen below, by pressing the **Sign in with Google** button:  

![Screenshot from 2024-06-22 20-40-33](https://github.com/ntua/saas2024-19/assets/115417360/7e8f9ab0-0abb-4fbd-a3eb-e54c55353cd0)  

If the user doesn't have an account he can hit the register button and the following page will be loaded. The user can then choose a username and a password, verify the chosen password and proceed to create an account:  

![Screenshot from 2024-06-22 20-41-58](https://github.com/ntua/saas2024-19/assets/115417360/80546c87-67bc-4fd8-8aeb-2936924285be)   

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

![Screenshot from 2024-06-22 20-46-35](https://github.com/ntua/saas2024-19/assets/115417360/74030d33-4ae7-48e5-8217-b68534948952)  

Apart from the submissions information and control described above, the home page also has the following functionalities:  
- the **Filter Options** button. By pressing it, the user can filter which submissions will be shown in the home page, according to their status (e.g. Make only the submissions whose status is **finished** visible):

![Screenshot from 2024-06-22 20-47-31](https://github.com/ntua/saas2024-19/assets/115417360/5d5d8d24-1c03-47a1-83e3-b41902d07b10)  

- a **Search Bar**. The user can search for a particular problem by typing its name there. As the user is typing, only the problems with names that contain the typed characters will appear and when the user has finished typing, only the problems whose names contain the typed characters will be visible.

- the **Submit new problem** button. By pressing it the user is navigated to a new page where he can submit a new problem. Once navigated there, the user must choose which solver's model he wants to utilize (as of now, only the Vehicle Routing Problem has been implemented as explained in the main README). Afterwards, the user will have to upload the two necessary files using the Drag & Drop method and specify the number of vehicles, the depot, the maximum distance of each vehicle and the name of the problem. He can then create the problem:

![Screenshot from 2024-06-22 20-48-47](https://github.com/ntua/saas2024-19/assets/115417360/e9c12ea2-c135-44e1-b780-130603c1242f)  

By pressing the **Open Script**/**Open Input Data File** buttons, the user can view the input files he just uploaded:  

![Screenshot from 2024-06-22 20-47-19](https://github.com/ntua/saas2024-19/assets/115417360/cb7d22da-e9cf-491c-9c29-d9a7174e44c0)

- the **View/Edit** button of each submission. By pressing this button the user can edit the submission he selected (only before officially submitting it to the solver) and also view that submission's input data (at all times). The user is navigated to a very similar page to the problem submission one, albeit with all input information already filled in as per the previous input data the user had specified for this problem. The user can change (or view) whatever he likes and update the problem:

 ![Screenshot from 2024-06-22 20-46-55](https://github.com/ntua/saas2024-19/assets/115417360/171dac49-4561-4462-8391-982a3e975ac6)

- the **View Results** button of each submission. By pressing this button the user can view the results of the submission he selected. The user is navigated to a new page that contains the results in a table format: each row corresponds to one particular vehicle and contains the vehicle number, the distance of the route it must perform and a button to see that route according to the solver's solution:  

![Screenshot from 2024-06-22 20-47-43](https://github.com/ntua/saas2024-19/assets/115417360/d9cdaa13-5017-472b-b48e-6c479b207a81)  

The user can then click the **Click to see route** button of a vehicle and the route that this vehicle must perform will appear in a pop-up window in a graph format for the user to see. The graph's nodes represent the locations this vehicle must visit and the edges indicate the order with which the vehicle must visit these locations. An example can be seen below (the starting node here is node 0):  

![Screenshot from 2024-06-22 20-48-01](https://github.com/ntua/saas2024-19/assets/115417360/1109eae6-11fc-4e00-8af9-0f392b1fc4e7)  

Finally, by clicking the File icon, the user can view the solver's raw answer as it is returned by the solver and download it (in .txt format) by pressing the **Download** button:  

![Screenshot from 2024-06-22 20-47-47](https://github.com/ntua/saas2024-19/assets/115417360/c8c13986-ba05-4264-8438-788689eba044)

- the **username icon**. By pressing it the user can view how many credits he has and also buy more credits using **PayPal**:

![Screenshot from 2024-06-22 20-49-51](https://github.com/ntua/saas2024-19/assets/115417360/0329d61c-f85e-413f-8d2e-c7a965d3bfec)

The user can specify the amount of credits he wants to purchase and then hit the **PayPal button** in order to pay. He will then be redirected to a PayPal Sandbox to finalize the purchase:   

![Screenshot from 2024-06-22 20-50-06](https://github.com/ntua/saas2024-19/assets/115417360/35bd7dea-12f9-4429-b207-e68e4f074978)  

Last but not least, the user can receive two kinds of **emails** to his personal Google email (provided he has logged in with his Google account to Solvio):

- a welcome email the first time he logs in to Solvio that can be seen below:

![Screenshot from 2024-06-22 20-51-29](https://github.com/ntua/saas2024-19/assets/115417360/4a45cb4e-ad2f-4125-80f7-6158273d5b71)  

- an email that notifies the user that a problem he has submitted to Solvio has been solved. This email also includes a link to the page containing the answer to this particular problem:

![Screenshot from 2024-06-22 20-51-50](https://github.com/ntua/saas2024-19/assets/115417360/e0ca9486-f5d4-4156-be6d-67153da172f5)







