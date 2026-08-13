create userMapper class 
add org.springframework.jdbc.core.RowMapper to interfaces section insdie the new java class pop up

replace T with UserBean in the class defn 

3. Click the red marker at the beginning of line five and then click the `Add unimplemented methods` option to implement the `RowMapper` interface’s `mapRow()` abstract method, as shown below.

then add the code the mapRow() method 

   general format below 
   
/* Create a UserBean object*/ UserBean user = new UserBean(); /* Populates the UserBean object with data from the resultSet */ user.setUserId(rs.getInt("userId")); user.setFirstName(rs.getString("firstName")); user.setLastName(rs.getString("lastName")); user.setUsername(rs.getString("username")); user.setPassword(rs.getString("password")); user.setPhone(rs.getString("phone")); user.setEmailId(rs.getString("emailId")); user.setEmailVerified(rs.getBoolean("emailVerified")); user.setCreatedOn(rs.getTimestamp("createdOn")); /* Return the populated UserBean object */ return user;