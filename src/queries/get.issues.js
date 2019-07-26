const GET_ISSUES_OF_REPOSITORY = `
  query ($login: String!, $repository: String!, $cursor: String) {
    repositoryOwner(login: $login) {
      login
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }      
        issues(first:10, after: $cursor, states: [OPEN]) {
          edges{
            node{
              id
              title
              url            
              reactions(first: 10){
                edges{
                  node{
                    content
                    id
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

export default GET_ISSUES_OF_REPOSITORY;
