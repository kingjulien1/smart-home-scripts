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
 * @return {string} value of the variable
 */
async function read(variable) {
  const url = `${api_endpoint}:${api_port}/${variable_endpoint}/${variable}`;

  const response = await fetch(url);
  const text = await response.text();

  // extract value of xml string
  // @todo make this work
  let matches = xml.match(/value="[\d]+"/gm);
  return matches.map((m) => m.match(/\d+/)[0])[0];
}

/**
 * (over)writes the value of a specfic variable
 *
 * @link ./api-endpoint-reference.pdf section 4.2 for writing variables with the `user/var` resource
 *
 * @param {string} variable address identifier
 *                          each variable is defined by a unique address in the CAN system.
 *                          this address can be determined by evaluating the menu tree {@link "./api-variable-reference.pdf"}
 * @param {string} value new value to set the variable to
 * @return {boolean} wether the (write) operation was successful
 */
async function write(variable, value) {
  const url = `${api_endpoint}:${api_port}/${variable_endpoint}/${variable}`;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const body = `value=${value}`;

  const response = await fetch(url, { method: "post", headers, body });
  const text = await response.text();
  return text.includes("success");
}
