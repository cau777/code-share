# Code Share

A social network that allows users to write and post snippets in different languages with a code editor, and interact
with other users' posts and profiles. It uses Supabase as the database and includes 2 microservices. It was inspired by
Twitter and GitHub, and made using NextJs.

## Features

* Dark theme interface using NextJs and Tailwind.
    * Mobile friendly
* Authentication
    * Email and password registration, with password requirements
    * Option to sign in with GitHub
    * Managed by Supabase
* Posting snippet
    * Fields fot title and description
    * Auto-generated keywords
    * Code editor based on Jetbrains IDEs
        * Syntax highlighting of keywords and literals
        * Inline and Multiline comments
        * Auto indent
        * Auto insert closing characters ("()", "{}", "[]")
        * Supports Java, C#, Javascript, Typescript and Python
* Search bar
* Profile customization
    * Username, real name and bio
    * Random robot profile image or uploaded from computer (with crop and resize)
* Likes and comments
* Microservices
    * Key Terms Extractor
        * Made in Python with Flask
        * Adapted version of my other project [Key-Terms-Extractor](https://github.com/cau777/Key-Terms-Extractor)
        * Calculates Td-Idf based on more than 100MB of code descriptions
    * Image Service
        * Made in C# with ASP.NET Core
        * Executes crop and resize on images and converts them to .jpg
* Installable PWA with caching
* Automatic deployment to Azure Container Apps using GitHub Actions
* Great score on Lighthouse
* Available in English and Portuguese
* Hosted on https://cau777.github.io/code-share/
  or https://code-share-nextjs.livelybay-b5b6ca38.brazilsouth.azurecontainerapps.io/

## Screenshots

1) ![Home Page](https://github.com/cau777/code-share/blob/main/screenshots/home.png)
2) ![Post Snippet Page](https://github.com/cau777/code-share/blob/main/screenshots/post_snippet.png)
3) ![Profile Page](https://github.com/cau777/code-share/blob/main/screenshots/profile.png)
4) ![Lighthouse Score](https://github.com/cau777/code-share/blob/main/screenshots/lighthouse.png)
