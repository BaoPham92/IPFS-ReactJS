pragma solidity 0.5.2;

contract SimpleStorage {
  uint storedHash;

  function set(uint x) public {
    storedHash = x;
  }

  function get() public view returns (uint) {
    return storedHash;
  }
}
