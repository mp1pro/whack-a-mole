import { ApolloClient, InMemoryCache, gql, createHttpLink, concat} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:8001'
});
const client = new ApolloClient({
    //authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const GraphQL = {

        users: async () => {
            try {
                fire.auth().currentUser.getIdToken(true)
                .then(function(idToken) {
                    const payloadHeader = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${idToken}`,
                        },
                    };
                    return payloadHeader;
                    // Send token to your backend via HTTPS
                    // ...
                }).then(function(payloadHeader){



                })
                .catch(function(error) {
                    // Handle error
                });

            }
            catch (error) {
                throw error
            }

        },

        getUser: async args => {
            try {

            }
            catch (error) {
                throw error
            }

        },

        createUser: async args => {
            try {

            }
            catch (error) {
                throw error
            }

        }
}

export default GraphQL;