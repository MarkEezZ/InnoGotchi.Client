# InnoGotchi game

Client side of the project.

---

## Running

#### 1. Backend installation

* Install MSSQL Server according to the __Metanit__ guide:

    [Go to the guide.](https://metanit.com/sql/sqlserver/1.2.php)

* Save the connection string to the server, which will be avaliable after installation.

* Open a folder where you want to install the backend.
* Git Bash this folder (You can use any other terminal).
* Run the command below:
```
    git clone https://github.com/MarkEezZ/InnoGotchi.API.git
```

* Open this folder using Visual Studio 2022
* Go to the file __appsettings.json__, set the parameters of the string just like in the string you have saved earlier. 
__Don't change the database name. The database with name "InnoGotchi" will be created on the server after using migrations.__
* Use migrations to create database:
    1. Find a View tab in the menu above.
    2. Open a Package Manager Console ( View > Other Windows > Package Manager Console )
    3. Run the commands below:
```
    Enable-Migrations
    Update-Database
```

#### 2. Frontend installation

* Open a folder where you want to install the frontend.
* Git Bash this folder (You can use any other terminal).
* Run the command below:
```
    git clone https://github.com/MarkEezZ/InnoGotchi.Client.git
```

#### 3. Running the project

* Run the backend using Visual Studio 2022 or __InnoGotchi.API.exe__ file in folder __InnoGotchi.API > bin > Debug > net6.0__.
* Run the frontend using Visual Studio Code by using one of the commands below in a terminal:
```
    npm start
```
```
    npm run build
```
if you use yarn:
```
    yarn start
```

* Open the adress https://localhost:3000 in any browser.

__Done.__

## Screenshots

#### Start Menu
To start user need to press the start button.

![start menu](/screenshots/start_window.png)

#### Authorization Menu
In the authorization window user can register new account or log in.

![start menu](/screenshots/auth_window.png)

#### Registration Menu
User needs to enter the valid data. After that the register button will become avaliable. 

![start menu](/screenshots/reg_window.png)

#### Log In Menu
Enter a login and password to log in.

![start menu](/screenshots/login_window.png)

#### Farms Menu
In the farms menu user can see what farms are avaliable for him. He can enter to his own farm and to farms he is invited at.

![start menu](/screenshots/farms_window.png)

#### Create Farm Window
If the user does not has a farm, he able to create it.

![start menu](/screenshots/create_farm_window.png)

#### Game Field

![start menu](/screenshots/game_field.png)
After selection of the farm the user enters the playing field. Game field is a place where user's pets are. Pets are created by the user.

![start menu](/screenshots/pets.png)

Game field also has another windows.

#### Constructor
Use the constructor to create new pets.

![start menu](/screenshots/constructor.png)

After a pet creation it spawns at the field.

![start menu](/screenshots/pets_with_swegg.png)

Pets in this game are able to die, so user should to take care about them. If the user usually forget to top up stats of pets, they can die. After a death user can delete a pet or resurrect him, but it will corrupt the statistics.

![start menu](/screenshots/pets_dead.png)

#### Statistics
The statistics window shows basic data about the farm, it also has the diagram, that shows how many pets are alive and how many pets was died.

![start menu](/screenshots/statistics_window.png)

#### Farm Review
The farm review window shows the list of all farm pets. At this page the user can top up stats of all of the pets simultaneously. If the user clicks to single pet record, pet review page opens.

![start menu](/screenshots/farm_review.png)

#### Pet Review
The pet review page contains more information about the pet.

![start menu](/screenshots/pet_review.png)

#### Invite Friends
User can invite another user to his farm. He can find a user by search.

![start menu](/screenshots/invite_friends.png)

#### User Settings
All of the users has his own settings. He can change them at the settings page.

![start menu](/screenshots/user_settings.png)
