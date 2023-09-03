import { Location } from "src/types/location";

export const locations: Location[] = [
   
    {
      id: '1a2b3c4d5678',
      locationName: 'Main Office',
      address: { city: 'New York', state: 'NY', postalCode: '10001' },
      companyName: 'CompanyA',
      contacts: [{ contactName: 'Alice', contactEmail: 'alice@companyA.com', contactRole: 'Manager' }],
      instruction: { instructionType: 'Delivery', instructionDescription: 'Deliver at the back door.', instructionCreationTimestamp: '2023-01-01T00:00:00Z' },
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z'
    },

    {
      id: '2b3c4d5e6789',
      locationName: 'Branch Office',
      address: { city: 'San Francisco', state: 'CA', postalCode: '94016' },
      companyName: 'CompanyB',
      contacts: [{ contactName: 'Bob', contactEmail: 'bob@companyB.com', contactRole: 'Supervisor' }],
      instruction: { instructionType: 'Visitor', instructionDescription: 'Check in at the front desk.', instructionCreationTimestamp: '2023-01-03T00:00:00Z' },
      isActive: true,
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-04T00:00:00Z'
    },
   
    {
      id: '3c4d5e6f7890',
      locationName: 'Warehouse',
      address: { city: 'Chicago', state: 'IL', postalCode: '60605' },
      companyName: 'CompanyC',
      contacts: [{ contactName: 'Charlie', contactEmail: 'charlie@companyC.com', contactRole: 'Clerk' }],
      instruction: { instructionType: 'Visitor', instructionDescription: 'Wear a helmet.', instructionCreationTimestamp: '2023-01-05T00:00:00Z' },
      isActive: true,
      createdAt: '2023-01-05T00:00:00Z',
      updatedAt: '2023-01-06T00:00:00Z'
    },

    {
      id: '4d5e6f7g8901',
      locationName: 'Remote Office',
      address: { city: 'Los Angeles', state: 'CA', postalCode: '90001' },
      companyName: 'CompanyD',
      contacts: [{ contactName: 'David', contactEmail: 'david@companyD.com', contactRole: 'Engineer' }],
      instruction: { instructionType: 'Delivery', instructionDescription: 'Ring the doorbell.', instructionCreationTimestamp: '2023-01-07T00:00:00Z' },
      isActive: true,
      createdAt: '2023-01-07T00:00:00Z',
      updatedAt: '2023-01-08T00:00:00Z'
    },
    {
        id: '5e6f7g8h9i',
        locationName: 'Store',
        address: { city: 'Los Angeles', state: 'CA', postalCode: '90001' },
        companyName: 'Company 5',
        contacts: [{ contactName: 'Emma', contactEmail: 'emma@email.com', contactRole: 'HR' }],
        isActive: true,
        createdAt: '2023-01-09T12:00:00Z',
        updatedAt: '2023-01-10T12:00:00Z'
      },
      {
        id: '6f7g8h9i10',
        locationName: 'Secondary Warenhouse',
        address: { city: 'Seattle', state: 'WA', postalCode: '98101' },
        companyName: 'Company 6',
        contacts: [{ contactName: 'Frank', contactEmail: 'frank@email.com', contactRole: 'Manager' }],
        isActive: true,
        createdAt: '2023-01-11T12:00:00Z',
        updatedAt: '2023-01-12T12:00:00Z'
      },
      {
        id: '7g8h9i10j',
        locationName: 'Location 7',
        address: { city: 'Boston', state: 'MA', postalCode: '02101' },
        companyName: 'Company 7',
        contacts: [{ contactName: 'Grace', contactEmail: 'grace@email.com', contactRole: 'HR' }],
        isActive: true,
        createdAt: '2023-01-13T12:00:00Z',
        updatedAt: '2023-01-14T12:00:00Z'
      },
      {
        id: '8h9i10j11',
        locationName: 'Location 8',
        address: { city: 'Dallas', state: 'TX', postalCode: '75201' },
        companyName: 'Company 8',
        contacts: [{ contactName: 'Henry', contactEmail: 'henry@email.com', contactRole: 'Manager' }],
        isActive: true,
        createdAt: '2023-01-15T12:00:00Z',
        updatedAt: '2023-01-16T12:00:00Z'
      },
      {
        id: '9i10j11k1',
        locationName: 'Location 9',
        address: { city: 'Chicago', state: 'IL', postalCode: '60601' },
        companyName: 'Company 9',
        contacts: [{ contactName: 'Ivy', contactEmail: 'ivy@email.com', contactRole: 'HR' }],
        isActive: true,
        createdAt: '2023-01-17T12:00:00Z',
        updatedAt: '2023-01-18T12:00:00Z'
      },
      {
        id: '10j11k12l',
        locationName: 'Location 10',
        address: { city: 'Denver', state: 'CO', postalCode: '80201' },
        companyName: 'Company 10',
        contacts: [{ contactName: 'Jack', contactEmail: 'jack@email.com', contactRole: 'Manager' }],
        isActive: true,
        createdAt: '2023-01-19T12:00:00Z',
        updatedAt: '2023-01-20T12:00:00Z'
      },
      {
        id: '11k12l13m',
        locationName: 'Location 11',
        address: { city: 'Miami', state: 'FL', postalCode: '33101' },
        companyName: 'Company 11',
        contacts: [{ contactName: 'Kate', contactEmail: 'kate@email.com', contactRole: 'HR' }],
        isActive: true,
        createdAt: '2023-01-21T12:00:00Z',
        updatedAt: '2023-01-22T12:00:00Z'
      },
      {
        id: '12l13m14n',
        locationName: 'Location 12',
        address: { city: 'San Francisco', state: 'CA', postalCode: '94101' },
        companyName: 'Company 12',
        contacts: [{ contactName: 'Leo', contactEmail: 'leo@email.com', contactRole: 'Manager' }],
        isActive: true,
        createdAt: '2023-01-23T12:00:00Z',
        updatedAt: '2023-01-24T12:00:00Z'
      },
      {
        id: '13m14n15o',
        locationName: 'Location 13',
        address: { city: 'Atlanta', state: 'GA', postalCode: '30301' },
        companyName: 'Company 13',
        contacts: [{ contactName: 'Mia', contactEmail: 'mia@email.com', contactRole: 'HR' }],
        isActive: true,
        createdAt: '2023-01-25T12:00:00Z',
        updatedAt: '2023-01-26T12:00:00Z'
      },
      {
        id: '14n15o16p',
        locationName: 'Location 14',
        address: { city: 'Houston', state: 'TX', postalCode: '77001' },
        companyName: 'Company 14',
        contacts: [{ contactName: 'Nina', contactEmail: 'nina@email.com', contactRole: 'Manager' }],
        isActive: true,
        createdAt: '2023-01-27T12:00:00Z',
        updatedAt: '2023-01-28T12:00:00Z'
      },
      {
        id: '15o16p17q',
        locationName: 'Location 15',
        address: { city: 'New York', state: 'NY', postalCode: '10001' },
        companyName: 'Company 15',
        contacts: [{ contactName: 'Oliver', contactEmail: 'oliver@email.com', contactRole: 'HR' }],
        isActive: true,
        createdAt: '2023-01-29T12:00:00Z',
        updatedAt: '2023-01-30T12:00:00Z'
      }
    
  ];
  