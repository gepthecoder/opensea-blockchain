import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'xrdcge3m',
  dataset: 'production',
  apiVersion: '2022-05-14',
  token:
    'skAz3dmDMTZ6pp5ry203nYNXEWxQZR2KytHYAzfBHOss3xKovGVKCfSRoKGbXYuqdXsaX928dvu0TWd0PgxOPZhVD8D84t1OvrVd1yp1oNNH9ImCSHU95l6VOtbuiSXzMWIq5R3mHnmsDYOUb5BfNfvAy0kcrEW1cPhZ8XSdk9aml9BUZfzQ',
  useCdn: false,
})