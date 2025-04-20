export const graphUrl = 'https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql';
export const authUrl = 'https://learn.zone01oujda.ma/api/auth/signin';

export const userNameQuery = `{
                                user {
                                  firstName
                                  lastName
                                }
                              }
`;

export const auditAndLevelQuery = `
{
  user {
    login
    firstName
    lastName
    totalUp
    totalDown
    auditRatio
  }

  transaction_aggregate(
    where: {type: {_eq: "level"}, event: {object: {name: {_eq: "Module"}}}}
    order_by: {createdAt: desc}
  ) {
    aggregate {
      max {
        amount
      }
    }
  }
}
`;

export const xpQuery = `
{
    transaction_aggregate(
        where: {
            type: { _eq: "xp" },
            _and: [
                { path: { _nlike: "%piscine-go%" } },
                { path: { _nlike: "%piscine-js/%" } }
            ]
        }
    ) {
        aggregate {
						sum{
              amount
            }

        }
    }
    transaction(
         where: {
           type: { _eq: "xp" },
        },
        order_by: { createdAt: desc },
    ) {
        path
        amount
        createdAt
    }
}
`;