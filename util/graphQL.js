import { ApolloClient, InMemoryCache, gql, createHttpLink, concat} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    console.log('tokenIssue', token);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const GraphQL = {

        users: async () => {
            try {
                return client.query({
                    query: gql`
                        {
                          users{
                            email
                            points
                          }
                        }
                    `
                })
                .then(result => {
                    //console.log('pre-result', result);
                    return result;
                });
            }
            catch (error) {
                throw error
            }

        },

        getUser: async email => {
            try {
                console.log('eargs', email);
                return client.query({
                    query: gql`
                      query getUser($email: String!){ 
                        getUser(email:$email){
                            points
                        }
                    }`,
                    variables: {
                        email: "mp1pro@gmail.com"
                    }
                })
                .then(result => {
                    console.log('one-user1', result);
                    return result;
                });
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