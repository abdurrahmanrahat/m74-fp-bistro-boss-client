/**
 * --------------------------
 *      Basic Security
 * --------------------------
 * 1) do not show the link to them who should not see it.
 * 1.5) only show to the person / types of user who should see it.
 * 2) do not allow to visit the links by typing on the url. 
 * 2.5) use AdminRoute that will check whether the use is admin or not.
 * 
 * --------------------------
 *      For sending data
 * ---------------------------
 * 1) verify jwt token (send authorization token in the header to the server). If possible use axios to send jwt token by intercepting the request. 
 * 2) if it is an admin activity, make sure only admin user make posting data by using     verifyAdmin function. 
 * 
 * 
*/