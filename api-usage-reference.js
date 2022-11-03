// base resource endpoint
const api_endpoint = "http://192.168.94.2";
// base resource port
const api_port = 8080;

// resource endpoint to read & write variables in the
const variable_endpoint = "user/vars";
// resource id for variable `heizgrenze`
const heizgrenze_variable_id = "120/10101/0/0/12096";

/**
 * reads the value of a specfic variable
 *
 * @link ./api-endpoint-reference.pdf section 4.1 for reading variables with the `user/var` resource
 *
 * @param {string} variable address identifier
 *                          each variable is defined by a unique address in the CAN system.
 *                          this address can be determined by evaluating the menu tree {@link "./api-variable-reference.pdf"}
 * @return {string} xml response as plain text
 * @example example response format (simplified) for call with `read("/user/var/120/10101/0/0/12096")`
 *          <eta version="1.0">
 *              <value uri="/user/var/120/10101/0/0/12096">14</value>
 *          </eta>
 */
async function read(variable) {
  const url = `${api_endpoint}:${api_port}/${variable_endpoint}/${variable}`;

  // make api call
  const response = await fetch(url);
  return await response.text();
}
