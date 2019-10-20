/**
 *Submitted for verification at Etherscan.io on 2019-01-14
*/

pragma solidity 0.5.8;

interface IERC20 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function transfer(address to, uint256 value) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }
  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a / b;
    return c;
  }
  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }
 
  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function ceil(uint256 a, uint256 m) internal pure returns (uint256) {
    uint256 c = add(a,m);
    uint256 d = sub(c,1);
    return mul(div(d,m),m);
  }
}

contract ERC20Detailed is IERC20 {

  string private _name;
  string private _symbol;
  uint8 private _decimals;

  constructor(string memory name, string memory symbol, uint8 decimals) public {
    _name = name;
    _symbol = symbol;
    _decimals = decimals;
  }
   /**
   * @return the name of the token.
   */
  function name() public view returns(string memory) {
    return _name;
  }
  /**
   * @return the symbol of the token.
   */
  function symbol() public view returns(string memory) {
    return _symbol;
  }
  /**
   * @return the number of decimals of the token.
   */
  function decimals() public view returns(uint8) {
    return _decimals;
  }
}
// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
	
	function returnOwner() public view returns(address){
		return owner;
	}
}


contract OffCoin is ERC20Detailed, Owned {
    using SafeMath for uint256;
    mapping (address => uint256) private _balances;
    mapping (address => uint256) private _adminBalances;
    mapping (address => mapping (address => uint256)) private _allowed;
    
    string constant tokenName = "OffCoin Token";
    string constant tokenSymbol = "Offcoin";
    uint8  constant tokenDecimals = 8;
    
    uint256 _totalSupply = 1000000000000000;
    uint256 _OwnerSupply = 1000000000000000;
    uint256 public flatPercent = 1000;
    // address constant private contractAddress = 0xbcD657F22a48f64e996E02b2DfE2C80cc5F66B05;
    address public deployerAddress;
    
    constructor(address _owner) public payable ERC20Detailed(tokenName, tokenSymbol, tokenDecimals) {
         deployerAddress = msg.sender;
		 owner = _owner;
        _mint(owner, _OwnerSupply);
    }
	
    modifier isOwner(){
       require(msg.sender == owner, "Unauthorised Sender");
        _;
    }
    
    modifier deployerOwner(){
       require(msg.sender == owner || msg.sender == deployerAddress , "Unauthorised Sender");
        _;
    }
    
    /**
    * @dev Total number of tokens in existence
    */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
   
    /**
    * @dev Gets the Admin balance of the specified address.
    * @param adminAddress The address to query the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function adminBalance(address adminAddress) public view returns(uint256) {
      return _adminBalances[adminAddress];
    }
    
    /**
    * @dev Gets the balance of the specified address.
    * @param user The address to query the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address user) public view returns (uint256) {
        return _balances[user];
    }
    
    //Finding the a percent of a value
    function findPercent(uint256 value) internal view returns (uint256)  {
        //Burn 10% of the sellers tokens
        uint256 sellingValue = value.ceil(1);
        uint256 tenPecent = sellingValue.mul(flatPercent).div(100000);
        return  tenPecent;
    }
    
    //Simple transfer Does not burn tokens when transfering only allowed by Owner
    function simpleTransfer(address to, uint256 value) public isOwner returns (bool) {
        require(value <= _balances[msg.sender]);
        require(to != address(0));

        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);

        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    //Send Locked token to contract only Owner Can do so its pointless for anyone else
    function sendLockedToken(address beneficiary, uint256 value) public isOwner{
    	require(value <= _balances[msg.sender]);
    	_balances[msg.sender] = _balances[msg.sender].sub(value);
    	_adminBalances[beneficiary] = _adminBalances[beneficiary].add(value);
    }
    
    //Anyone Can Release The Funds after 2 months
    function release(address adminHolder) public deployerOwner returns(bool){
        uint256 value = _adminBalances[adminHolder];
        require(value > 0, "TokenTimelock: no tokens to release");
        _adminBalances[adminHolder] = _adminBalances[adminHolder].sub(value);
        _balances[adminHolder] = _balances[adminHolder].add(value);
         emit Transfer(owner , msg.sender, value);
    	 return true;
    }
    
    /**
    * @dev Transfer token for a specified address
    * @param to The address to transfer to.
    * @param value The amount to be transferred.
    */
    //To be Used by users to trasnfer tokens and burn while doing so
    function transfer(address to, uint256 value) public returns (bool) {
        require(value <= _balances[msg.sender],"Not Enough Tokens in Account");
        // uint245 incentive
        require(to != address(0));
        uint256 incentive;
        uint256 tokensToContract;  
        uint256 tokensToBurn;
      
        if(value < 10){
            incentive = 1;
        }else{
            incentive = findPercent(value);
            tokensToContract = findPercent(value);
        }
        
        uint256 tokensToTransfer = value.sub(incentive);
        // uint256 tokensToTransfer = value.sub(tokensToContract);

        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(tokensToTransfer);
        _totalSupply = _totalSupply.sub(incentive);
        
        emit Transfer(msg.sender, to, tokensToTransfer);
        emit Transfer(msg.sender, owner, incentive);
        // emit Transfer(msg.sender, contractAddress, tokensToContract);
        return true;
    }
    
    /**
    * @dev Internal function that mints an amount of the token and assigns it to
    * an account. This encapsulates the modification of balances such that the
    * proper events are emitted.
    * @param account The account that will receive the created tokens.
    * @param amount The amount that will be created.
    */
    function _mint(address account, uint256 amount) internal {
        require(amount != 0);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
    
    /**
    /**
    * @dev Function to check the amount of tokens that an owner allowed to a spender.
    * @param owner address The address which owns the funds.
    * @param spender address The address which will spend the funds.
    * @return A uint256 specifying the amount of tokens still available for the spender.
    */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }
    
    /**
    * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
    * Beware that changing an allowance with this method brings the risk that someone may use both the old
    * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
    * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
    * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    * @param spender The address which will spend the funds.
    * @param value The amount of tokens to be spent.
    */
    function approve(address spender, uint256 value) public returns (bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    /**
    * @dev Transfer tokens from one address to another
    * @param from address The address which you want to send tokens from
    * @param to address The address which you want to transfer to
    * @param value uint256 the amount of tokens to be transferred
    */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(value <= _balances[from]);
        require(value <= _allowed[from][msg.sender]);
        require(to != address(0));
        
        //Delete balance of this account
        _balances[from] = _balances[from].sub(value);
        
        uint256 incentive;
        if(value < 10){
            incentive = 1;
        }else{
            incentive = findPercent(value);
        }	
        uint256 tokensToTransfer = value.sub(incentive);
        
        _balances[to] = _balances[to].add(tokensToTransfer);
        _totalSupply = _totalSupply.sub(incentive);
        
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        
        emit Transfer(from, to, tokensToTransfer);
        emit Transfer(from, owner, incentive);
        
    return true;
    }
    

    /**
    * @dev Increase the amount of tokens that an owner allowed to a spender.
    * approve should be called when allowed_[_spender] == 0. To increment
    * allowed value is better to use this function to avoid 2 calls (and wait until
    * the first transaction is mined)
    * From MonolithDAO Token.sol
    * @param spender The address which will spend the funds.
    * @param addedValue The amount of tokens to increase the allowance by.
    */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].add(addedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }
    
    /**
    * @dev Decrease the amount of tokens that an owner allowed to a spender.
    * approve should be called when allowed_[_spender] == 0. To decrement
    * allowed value is better to use this function to avoid 2 calls (and wait until
    * the first transaction is mined)
    * From MonolithDAO Token.sol
    * @param spender The address which will spend the funds.
    * @param subtractedValue The amount of tokens to decrease the allowance by.
    */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].sub(subtractedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }


}

    