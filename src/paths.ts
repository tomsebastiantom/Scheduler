export const paths = {
  index: "/",

  contact: "/contact",

  login: "/login",
  register: "/register",
  dashboard: {
    index: "/dashboard",
   
  
    blank: "/dashboard/blank",
  
  
    locations: {
      index: "/dashboard/locations",
      edit: (locationId: string) => `/dashboard/locations/${locationId}/edit`,
      add: "/dashboard/locations/add",
    },
    
   
   
   
    scheduling: {
      index: "/dashboard/scheduling",
    },
  
    users: {
      index: "/dashboard/users",
      details: (userId: string) => `/dashboard/users/${userId}/`,
      edit: (userId: string) => `/dashboard/users/${userId}/edit`,
    },
   
  },
 
  docs: "",
  notAuthorized: "/401",
  notFound: "/404",
  serverError: "/500",
};
