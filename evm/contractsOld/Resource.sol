pragma solidity ^0.5.0;

import "./OracleExternalConsumer.sol";

contract Resource is OracleExternalConsumer {

    function initialize() external initializer {
        Ownable.initialize(msg.sender);
    }

}