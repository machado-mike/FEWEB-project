# Tekken 8 Character Database





This project is a web application that allows users to search for Tekken 8 characters and view detailed information about them. Users can see:



* Character information (birthday, country, fighting style, bio, and image)



* Move list



* YouTube trailer for the character







## APIs Used





#### TekkenDocs API



* Provides move list for Tekken 8 characters.





#### YouTube Data API v3



* Used to search for and embed trailers of Tekken 8 characters.





#### Local JSON File (charinfo.json)



* Contains additional information about each character (name, bio, birthday, country, style, image).









## How to use





1. #### Search for a Character



* Type the name of your desired character into the search bar at the top of the page.



* Press Enter or click the Search button.





#### 2\. View Character Info



* After searching, you will see the character’s name, bio, birthday, country, fighting style, and image displayed at the top of the results.





#### 3\. Explore the Move List



* Underneath the character info, there is a collapsible move list. Click the header to expand it.



* At the top of the move list, you’ll see notation images explaining directional and button inputs.



* Use the search bar above the table to filter moves by name, command, or other attributes.





#### 4\. Watch the YouTube Trailer



* Below the move list, an embedded YouTube video shows the character’s trailer.







### Important Setup Notes



* For the APIs to work, you need to install Allow CORS extension on your browser.



* For the YouTube API, a YouTube API key is required.



* You must also enable “Access-Control-Allow-Credentials” in your CORS extension settings for the video to play.
