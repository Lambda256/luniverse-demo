const Config = {
  AUTH_TOKEN : import.meta.env.VITE_AUTH_TOKEN,
  
  
  BASE_URL : "https://api.luniverse.io/svc/v2",
  AUTH_TOKEN_URL : "/auth-tokens",
  EVENTS_URL : "/neptune/trace-programs/5560136422332062785/events",
  
  // EVENT NAMES
  CREATE : "Create",
  ADD : "Add",
  
  // DEFAULT SETTINGS
  DEFAULT_ITEMS_USER_NAME : "trace_demo",
  DEFAULT_ITEMS_OBJECT_ID : "Trace_demo_default_items",
  
  // USER DEFAULT SETTINGS
  USER_NAME : import.meta.env.VITE_USER_NAME,
  USER_ITEMS_OBJECT_ID : "Trace_demo_user_items",
}

export default Config