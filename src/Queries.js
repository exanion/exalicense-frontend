import gql from "graphql-tag";

export const LICENSES_GET = gql`
    query licensesGet {
        licenses {
            id
            leaseCountLimit
            expiry
            isExpired
            licenseKeys
            comment
            updatedAt
            createdAt
            customer {
                id
                displayname
            }
            features {
                id
                name
                product {
                    id
                    name
                }
            }
            leases {
                id
                leaseKey
                expiry
                clientId
                isReleased
                isValid
                createdAt
                updatedAt
            }
        }
    }
`;

export const LEASE_RELEASE = gql`
    mutation LeaseSetReleased($id: ID!, $isReleased: Boolean) {
        leaseSetReleased(input: { id: $id, isReleased: $isReleased }) {
            message
            success
        }
    }
`;

export const LICENSE_ADD = gql`
    mutation CreateLicense(
        $customer: ID!
        $features: [ID!]!
        $leaseCountLimit: Int
        $expiry: Date
        $licenseKeys: [String]
        $comment: String
    ) {
        licenseCreate(
            input: {
                customer: $customer
                features: $features
                leaseCountLimit: $leaseCountLimit
                expiry: $expiry
                licenseKeys: $licenseKeys
                comment: $comment
            }
        ) {
            success
            message
            license {
                id
                leaseCountLimit
                expiry
                isExpired
                licenseKeys
                comment
                updatedAt
                createdAt
                customer {
                    id
                    displayname
                }
                features {
                    id
                    name
                    product {
                        id
                        name
                    }
                }
                leases {
                    id
                }
            }
        }
    }
`;

export const LICENSE_UPDATE = gql`
    mutation UpdateLicense(
        $id: ID!
        $customer: ID!
        $features: [ID!]!
        $leaseCountLimit: Int
        $expiry: Date
        $licenseKeys: [String]
        $comment: String
    ) {
        licenseUpdate(
            input: {
                id: $id
                customer: $customer
                features: $features
                leaseCountLimit: $leaseCountLimit
                expiry: $expiry
                licenseKeys: $licenseKeys
                comment: $comment
            }
        ) {
            success
            message
            license {
                id
                leaseCountLimit
                expiry
                isExpired
                licenseKeys
                comment
                updatedAt
                createdAt
                customer {
                    id
                    displayname
                }
                features {
                    id
                    name
                    product {
                        id
                        name
                    }
                }
                leases {
                    id
                }
            }
        }
    }
`;

export const LICENSE_DELETE = gql`
    mutation DeleteLicense($id: ID!) {
        licenseDelete(input: { id: $id }) {
            success
            message
        }
    }
`;

export const CUSTOMERS_SIMPLE = gql`
    query customersSimple {
        customers {
            id
            displayname
            comment
        }
    }
`;

export const CUSTOMERS_GET = gql`
    query customersGet {
        customers {
            id
            displayname
            contactName
            contactMail
            contactPhone
            licenses {
                id
            }
            comment
            updatedAt
            createdAt
        }
    }
`;

export const CUSTOMER_UPDATE = gql`
    mutation UpdateCustomer(
        $id: ID!
        $displayname: String
        $contactName: String
        $contactMail: String
        $contactPhone: String
        $comment: String
    ) {
        customerUpdate(
            input: {
                id: $id
                displayname: $displayname
                contactName: $contactName
                contactMail: $contactMail
                contactPhone: $contactPhone
                comment: $comment
            }
        ) {
            success
            message
            customer {
                id
                displayname
                contactName
                contactMail
                contactPhone
                licenses {
                    id
                }
                comment
                updatedAt
                createdAt
            }
        }
    }
`;

export const CUSTOMER_ADD = gql`
    mutation CreateCustomer(
        $displayname: String!
        $contactName: String
        $contactMail: String
        $contactPhone: String
        $comment: String
    ) {
        customerCreate(
            input: {
                displayname: $displayname
                contactName: $contactName
                contactMail: $contactMail
                contactPhone: $contactPhone
                comment: $comment
            }
        ) {
            success
            message
            customer {
                id
                displayname
                contactName
                contactMail
                contactPhone
                licenses {
                    id
                }
                comment
                updatedAt
                createdAt
            }
        }
    }
`;

export const CUSTOMER_DELETE = gql`
    mutation DeleteCustomer($id: ID!) {
        customerDelete(input: { id: $id }) {
            success
            message
        }
    }
`;

export const PRODUCTS_SIMPLE = gql`
    query productsSimple {
        products {
            id
            name
            displayname
            features {
                id
                name
                displayname
            }
        }
    }
`;

export const PRODUCTS_GET = gql`
    query productsGet {
        products {
            id
            name
            displayname
            updatedAt
            createdAt
            features {
                id
                name
                displayname
                createdAt
                updatedAt
                licenses {
                    id
                }
            }
        }
    }
`;

export const PRODUCT_DELETE = gql`
    mutation DeleteProduct($id: ID!) {
        productDelete(input: { id: $id }) {
            success
            message
        }
    }
`;

export const PRODUCT_ADD = gql`
    mutation CreateProduct($name: String!, $displayname: String) {
        productCreate(input: { name: $name, displayname: $displayname }) {
            success
            message
            product {
                id
                name
                displayname
                updatedAt
                createdAt
                features {
                    id
                    name
                    displayname
                    createdAt
                    updatedAt
                    licenses {
                        id
                    }
                }
            }
        }
    }
`;

export const PRODUCT_UPDATE = gql`
    mutation UpdateProduct($id: ID!, $name: String, $displayname: String) {
        productUpdate(
            input: { id: $id, name: $name, displayname: $displayname }
        ) {
            success
            message
            product {
                id
                name
                displayname
                updatedAt
                createdAt
                features {
                    id
                    name
                    displayname
                    createdAt
                    updatedAt
                    licenses {
                        id
                    }
                }
            }
        }
    }
`;

export const FEATURE_UPDATE = gql`
    mutation UpdateFeature($id: ID!, $name: String, $displayname: String) {
        featureUpdate(
            input: { id: $id, name: $name, displayname: $displayname }
        ) {
            success
            message
            feature {
                id
                name
                displayname
                createdAt
                updatedAt
                licenses {
                    id
                }
            }
        }
    }
`;

export const FEATURE_ADD = gql`
    mutation CreateFeature(
        $name: String!
        $product: ID!
        $displayname: String
    ) {
        featureCreate(
            input: { name: $name, displayname: $displayname, product: $product }
        ) {
            success
            message
            feature {
                id
                name
                displayname
                createdAt
                updatedAt
                licenses {
                    id
                }
            }
        }
    }
`;

export const FEATURE_DELETE = gql`
    mutation DeleteFeature($id: ID!) {
        featureDelete(input: { id: $id }) {
            success
            message
        }
    }
`;

export const ORGANIZATION_GET = gql`
    query getOrganization {
        organization {
            id
            displayname
            licensingEndpoint
            signingKey
            admins {
                id
                username
                displayname
                email
                isSelf
                createdAt
                updatedAt
            }
        }
    }
`;

export const ADMIN_DELETE = gql`
    mutation deleteAdmin($id: ID!) {
        adminDelete(input: { id: $id }) {
            success
            message
        }
    }
`;

export const ADMIN_ADD = gql`
    mutation createAdmin(
        $username: String!
        $displayname: String
        $email: String
        $password: String
    ) {
        adminCreate(
            input: {
                username: $username
                displayname: $displayname
                password: $password
                email: $email
            }
        ) {
            message
            success
        }
    }
`;

export const ADMIN_UPDATE = gql`
    mutation updateAdmin(
        $id: ID!
        $username: String
        $displayname: String
        $email: String
    ) {
        adminUpdate(
            input: {
                id: $id
                username: $username
                displayname: $displayname
                email: $email
            }
        ) {
            message
            success
        }
    }
`;

export const ADMIN_SELF_GET = gql`
    query getAdminSelf {
        adminSelf {
            id
            username
            displayname
            email
            createdAt
            updatedAt
        }
    }
`;

export const SET_OWN_PASSWORD = gql`
    mutation SetOwnPassword($currentPassword: String!, $newPassword: String!) {
        setOwnPassword(
            input: {
                currentPassword: $currentPassword
                newPassword: $newPassword
            }
        ) {
            message
            success
        }
    }
`;

const Queries = {
    LICENSES_GET,
    LEASE_RELEASE,
    LICENSE_ADD,
    LICENSE_UPDATE,
    LICENSE_DELETE,
    CUSTOMERS_SIMPLE,
    CUSTOMERS_GET,
    CUSTOMER_UPDATE,
    CUSTOMER_DELETE,
    CUSTOMER_ADD,
    PRODUCTS_SIMPLE,
    PRODUCTS_GET,
    PRODUCT_UPDATE,
    PRODUCT_ADD,
    PRODUCT_DELETE,
    FEATURE_ADD,
    FEATURE_UPDATE,
    FEATURE_DELETE,
    ORGANIZATION_GET,
    ADMIN_DELETE,
    ADMIN_ADD,
    ADMIN_UPDATE,
    ADMIN_SELF_GET,
    SET_OWN_PASSWORD,
};

export default Queries;
