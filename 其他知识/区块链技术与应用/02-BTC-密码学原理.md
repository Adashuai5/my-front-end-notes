加密货币 crypto-currency

比特币主要用到了密码学中的两个功能: 1. 哈希 2. 签名

1. 哈希函数 cryptographic hash function

   1. collision resistance (这里指哈希碰撞)

      例如x≠y H(x)=H(y) 两个不同的输入，输出却是相等的，这就称哈希碰撞。它是不可避免的，因为输入空间总大于输出空间。给出x，很难找到y，除非蛮力求解(brute-force)

      该性质的作用: 对一个 message 求 digest 

      比如 message 取m，m的哈希值是H(m)=digest 如果有人想篡改m值而H(m)不变，则无法做到

      哈希碰撞无法人为制造，无法验证，是根据实践经验得来的

   2. hiding 

      哈希函数的计算过程是单向的，不可逆的(从H(x)无法推导出x) 

      前提是输入空间足够大，分布比较均匀。如果不是足够大，一般在x后面拼接一个随机数，如H(x||nonce)

      该性质的作用: 和 collision resistance 结合在一起，用来实现digital commitment(数据保证，又称为 digital equivalent of a sealed envelope(密封信封))

      把预测结果作为输入x，算出一个哈希值，将哈希值公布，hiding 让人们知道哈希值而不知道预测值，最后再将x公布，因为有 collision resistance 的性质，预测结果是不可篡改的

   3. puzzle friendly 指哈希值的预算事先是不可预测的

      比特币挖矿的过程中实际就是找一个 nonce，nonce 跟区块的块头里的其他信息合一起作为输入，得出的哈希值要小于等于某个指定的目标预值。H(block header)≤target。block header 指块头，块头里有很多域，其中一个域是我们可以设置的随机数nonce，挖矿的过程是不停的试随机数，使得block header取哈希后落在指定的范围之内。

      puzzle friendly 是指挖矿过程中没有捷径，为了使输出值落在指定范围，只能一个一个去试。所以这个过程还可以作为工作量证明(proof of work)。
      挖矿难，但验证易(difficult to solve,but easy to verify)

      比特币中用的哈希函数叫作 SHA-256(secure hash algorithm )，以上三个性质它都是满足的



