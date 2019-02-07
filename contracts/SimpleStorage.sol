pragma solidity 0.5.0;

contract SimpleStorage {
  string storedHash;

  function set(string memory x) public {
    storedHash = x;
  }

  function get() public view returns (string memory ) {
    return storedHash;
  }
}
