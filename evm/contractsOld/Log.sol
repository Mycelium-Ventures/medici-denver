pragma solidity ^0.5.0;

// Constructor for Upgradeable Contract due to Proxy architecture
import "./OracleExternalConsumer.sol";

contract Log is OracleExternalConsumer {
    event LogMessage(string log);

    function logMessage(string calldata _message) external {
        emit LogMessage(_message);
    }

}