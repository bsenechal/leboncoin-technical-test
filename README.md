# Context :

Frontend technical exercise for Leboncoin
https://github.com/leboncoin/frontend-technical-test

# Technical choices :

**Libraries :**

- MUI: Clearly such a large library is not necessary and not recommended for a project like this. However, the idea was to show the use of this kind of library and not to recode a design system from scratch
- React-query: This is the most important library in this project. All the logic is based on its cache mechanism. For example, the display of message information relies on this cache to avoid making too many unnecessary requests. I preferred to use this library rather than SWR, because it also gives a state of the requests during the mutations and not only during the fetching of the data
- Axios: By default axios converts query results to json format so I found this more comfortable to use than fetch

**Architecture:**

The organization of the folders tries to stay as close as possible to the url of the application by isolating the pages as much as possible. The data transfer between two pages is done by react-query and especially its cache to avoid too many requests. The advantage of this architecture is that it is very easy to maintain and it is very easy to delete or modify parts of the application without risk of complication.
I also chose to create folders for messages and users, even if they are not directly displayed, they are basic components for the application if it evolves

# Limitations

The architecture is not perfect and the fact of isolating the pages as much as possible, makes that sometimes endpoints are missing with the current server. For example, the retrieval of the interlocutor on the detail of the conversation requires two requests whereas a passage of props could be enough

The test suite is very limited. At the very least, the display and creation of a message should be tested

# Time spent

About 6 hours

# To go further

The idea of this exercise is not to spend 2 days on it. With more time I would have certainly developed the test suite, the error handling, and probably changed the way to retrieve the users in the conversation details
