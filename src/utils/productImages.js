const IMAGE = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;

const IMAGE_POOLS = {
  Mobiles: [
    IMAGE("photo-1511707171634-5f897ff02aa9"),
    IMAGE("photo-1598327105666-5b89351aff97"),
    IMAGE("photo-1556656793-08538906a9f8"),
    IMAGE("photo-1510557880182-3d4d3cba35a5"),
    IMAGE("photo-1523206489230-c012c64b2b48"),
    IMAGE("photo-1605236453806-6ff36851218e"),
    IMAGE("photo-1592750475338-74b7b21085ab"),
    IMAGE("photo-1580910051074-3eb694886505"),
  ],

  Laptops: [
    IMAGE("photo-1496181133206-80ce9b88a853"),
    IMAGE("photo-1496180727794-817822f65950"),
    IMAGE("photo-1531297484001-80022131f5a1"),
    IMAGE("photo-1593642702821-c8da6771f0c6"),
    IMAGE("photo-1517336714739-489689fd1ca8"),
    IMAGE("photo-1593642532400-2682810df593"),
    IMAGE("photo-1541807084-5c52b6b3adef"),
    IMAGE("photo-1525547719571-a2d4ac8945e2"),
  ],

  Electronics: [
    IMAGE("photo-1498049794561-7780e7231661"),
    IMAGE("photo-1550009158-9ebf69173e03"),
    IMAGE("photo-1588508065123-287b28e013da"),
    IMAGE("photo-1468495244123-6c6c332eeece"),
    IMAGE("photo-1505740420928-5e560c06d30e"),
    IMAGE("photo-1608043152269-423dbba4e7e1"),
    IMAGE("photo-1527814050087-3793815479db"),
    IMAGE("photo-1587829741301-dc798b83add3"),
  ],

  Fashion: [
    IMAGE("photo-1445205170230-053b83016050"),
    IMAGE("photo-1490481651871-ab68de25d43d"),
    IMAGE("photo-1483985988355-763728e1935b"),
    IMAGE("photo-1529139574466-a303027c1d8b"),
    IMAGE("photo-1485968579580-b6d095142e6e"),
    IMAGE("photo-1496747611176-843222e1e57c"),
    IMAGE("photo-1515886657613-9f3515b0c78f"),
    IMAGE("photo-1485230895905-ec40ba36b9bc"),
  ],

  Shoes: [
    IMAGE("photo-1542291026-7eec264c27ff"),
    IMAGE("photo-1552346154-21d32810aba3"),
    IMAGE("photo-1460353581641-37baddab0fa2"),
    IMAGE("photo-1525966222134-fcfa99b8ae77"),
    IMAGE("photo-1549298916-b41d501d3772"),
    IMAGE("photo-1560769629-975ec94e6a86"),
    IMAGE("photo-1551107696-a4b0c5a0d9a2"),
    IMAGE("photo-1595950653106-6c9ebd614d3a"),
  ],

  "Home & Kitchen": [
    IMAGE("photo-1556911220-e15b29be8c8f"),
    IMAGE("photo-1556912167-f556f1f39fdf"),
    IMAGE("photo-1555041469-a586c61ea9bc"),
    IMAGE("photo-1586023492125-27b2c045efd7"),
    IMAGE("photo-1556909212-d5b604d0c90d"),
    IMAGE("photo-1495474472287-4d71bcdd2085"),
    IMAGE("photo-1509440159596-0249088772ff"),
    IMAGE("photo-1513694203232-719a280e022f"),
  ],

  Beauty: [
    IMAGE("photo-1596462502278-27bfdc403348"),
    IMAGE("photo-1556228578-8c89e6adf883"),
    IMAGE("photo-1571781926291-c477ebfd024b"),
    IMAGE("photo-1611930022073-b7a4ba5fcccd"),
    IMAGE("photo-1522335789203-aabd1fc54bc9"),
    IMAGE("photo-1598440947619-2c35fc9aa908"),
    IMAGE("photo-1608248543803-ba4f8c70ae0b"),
    IMAGE("photo-1620916566398-39f1143ab7be"),
  ],

  Grocery: [
    IMAGE("photo-1542838132-92c53300491e"),
    IMAGE("photo-1601598851547-4302969d6a0b"),
    IMAGE("photo-1586201375761-83865001e31c"),
    IMAGE("photo-1498837167922-ddd27525d352"),
    IMAGE("photo-1512621776951-a57141f2eefd"),
    IMAGE("photo-1547592180-85f173990554"),
    IMAGE("photo-1490645935967-10de6ba17061"),
    IMAGE("photo-1506484381205-f7945653044d"),
  ],

  Books: [
    IMAGE("photo-1544947950-fa07a98d237f"),
    IMAGE("photo-1512820790803-83ca734da794"),
    IMAGE("photo-1495446815901-a7297e633e8d"),
    IMAGE("photo-1519682337058-a94d519337bc"),
    IMAGE("photo-1497633762265-9d179a990aa6"),
    IMAGE("photo-1521587760476-6c12a4b040da"),
    IMAGE("photo-1511108690759-009324a90311"),
    IMAGE("photo-1516979187457-637abb4f9353"),
  ],

  Sports: [
    IMAGE("photo-1461896836934-ffe607ba8211"),
    IMAGE("photo-1517836357463-d25dfeac3438"),
    IMAGE("photo-1579952363873-27f3bade9f55"),
    IMAGE("photo-1599058917212-d750089bc07e"),
    IMAGE("photo-1538805060514-97d9cc17730c"),
    IMAGE("photo-1517649763962-0c623066013b"),
    IMAGE("photo-1552674605-db6ffd4facb5"),
    IMAGE("photo-1546519638-68e109498ffc"),
  ],

  Accessories: [
    IMAGE("photo-1523275335684-37898b6baf30"),
    IMAGE("photo-1559563458-527698bf5295"),
    IMAGE("photo-1553062407-98eeb64c6a62"),
    IMAGE("photo-1511499767150-a48a237f0083"),
    IMAGE("photo-1627123424574-724758594e93"),
    IMAGE("photo-1523779917675-b6ed3a42a561"),
    IMAGE("photo-1612902456551-333ac5afa26e"),
    IMAGE("photo-1584917865442-de89df76afd3"),
  ],
};

const TYPE_POOLS = {
  smartphone: IMAGE_POOLS.Mobiles,
  laptop: IMAGE_POOLS.Laptops,

  earbuds: [
    IMAGE("photo-1606220945770-b5b6c2c55bf1"),
    IMAGE("photo-1590658268037-6bf12165a8df"),
    IMAGE("photo-1608156639585-b3a032ef9689"),
    IMAGE("photo-1588423771073-b8903fbb85b5"),
    IMAGE("photo-1484704849700-f032a568e944"),
    IMAGE("photo-1572569511254-d8f925fe2cbb"),
    IMAGE("photo-1546435770-a3e426bf472b"),
    IMAGE("photo-1578319439584-104c94d37305"),
  ],

  headphone: [
    IMAGE("photo-1505740420928-5e560c06d30e"),
    IMAGE("photo-1484704849700-f032a568e944"),
    IMAGE("photo-1583394838336-acd977736f90"),
    IMAGE("photo-1577174881658-0f30ed549adc"),
    IMAGE("photo-1546435770-a3e426bf472b"),
    IMAGE("photo-1487215078519-e21cc028cb29"),
    IMAGE("photo-1599669454699-248893623440"),
    IMAGE("photo-1524678606370-a47ad25cb82a"),
  ],

  watch: [
    IMAGE("photo-1523275335684-37898b6baf30"),
    IMAGE("photo-1524805444758-089113d48a6d"),
    IMAGE("photo-1522312346375-d1a52e2b99b3"),
    IMAGE("photo-1434056886845-dac89ffe9b56"),
    IMAGE("photo-1523170335258-f5ed11844a49"),
    IMAGE("photo-1508057198894-247b23fe5ade"),
    IMAGE("photo-1495857000853-fe46c8aefc30"),
    IMAGE("photo-1547996160-81dfa63595aa"),
  ],

  wallet: [
    IMAGE("photo-1627123424574-724758594e93"),
    IMAGE("photo-1553062407-98eeb64c6a62"),
    IMAGE("photo-1591561954557-26941169b49e"),
    IMAGE("photo-1601598851547-4302969d6a0b"),
    IMAGE("photo-1555529669-e69e7aa0ba9a"),
    IMAGE("photo-1612902456551-333ac5afa26e"),
    IMAGE("photo-1548036328-c9fa89d128fa"),
    IMAGE("photo-1594223274512-ad4803739b7c"),
  ],

  sunglasses: [
    IMAGE("photo-1511499767150-a48a237f0083"),
    IMAGE("photo-1577803645773-f96470509666"),
    IMAGE("photo-1519085360753-af0119f7cbe7"),
    IMAGE("photo-1556306535-38febf6782e7"),
    IMAGE("photo-1508296695146-257a814070b4"),
    IMAGE("photo-1572635196237-14b3f281503f"),
    IMAGE("photo-1516962215378-7fae8c7b6a2b"),
    IMAGE("photo-1511499767150-a48a237f0083", 901),
  ],

  shoes: IMAGE_POOLS.Shoes,

  shirt: [
    IMAGE("photo-1521572163474-6864f9cf17ab"),
    IMAGE("photo-1602810318383-e386cc2a3ccf"),
    IMAGE("photo-1581655353564-df123a1eb820"),
    IMAGE("photo-1562157873-818bc0726f68"),
    IMAGE("photo-1596755389378-c31d21fd1273"),
    IMAGE("photo-1618354691373-d851c5c3a990"),
    IMAGE("photo-1620799140408-edc6dcb6d633"),
    IMAGE("photo-1622445275576-3d45c9a5c8e5"),
  ],

  jeans: [
    IMAGE("photo-1542272604-787c3835535d"),
    IMAGE("photo-1541099649105-f69ad21f3246"),
    IMAGE("photo-1582552938357-32b906df40cb"),
    IMAGE("photo-1604176354204-9268737828e4"),
    IMAGE("photo-1551028719-00167b16eac5"),
    IMAGE("photo-1475178626620-a4d074967452"),
    IMAGE("photo-1548883354-94bcfe321cbb"),
    IMAGE("photo-1516762689617-e1cffcef479d"),
  ],

  jacket: [
    IMAGE("photo-1551028719-00167b16eac5"),
    IMAGE("photo-1544966503-7cc5ac882d5f"),
    IMAGE("photo-1529139574466-a303027c1d8b"),
    IMAGE("photo-1548883354-94bcfe321cbb"),
    IMAGE("photo-1541101767792-f9b2b1c4f127"),
    IMAGE("photo-1543076447-215ad9ba6923"),
    IMAGE("photo-1551488831-00ddcb6c6bd3"),
    IMAGE("photo-1506629905607-d9f6e8f4b3d8"),
  ],

  dress: [
    IMAGE("photo-1595777457583-95e059d581b8"),
    IMAGE("photo-1515372039744-b8f02a3ae446"),
    IMAGE("photo-1539008835657-9e8e9680c956"),
    IMAGE("photo-1566174053879-31528523f8ae"),
    IMAGE("photo-1591369822096-ffd140ec948f"),
    IMAGE("photo-1572804013309-59a88b7e92f1"),
    IMAGE("photo-1581044777550-4cfa60707c03"),
    IMAGE("photo-1496747611176-843222e1e57c"),
  ],

  cosmetics: IMAGE_POOLS.Beauty,
  books: IMAGE_POOLS.Books,
  sports: IMAGE_POOLS.Sports,
};

const normalize = (value) =>
  String(value || "").toLowerCase();

const hashProduct = (product) => {
  const key = String(
    product?._id ||
      product?.slug ||
      product?.id ||
      product?.title ||
      "product"
  );

  let hash = 2166136261;

  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const getProductImagePool = (product) => {
  const text = normalize(
    `${product?.title || ""} ${product?.subCategory || ""} ${
      product?.category || ""
    }`
  );

  const rules = [
    ["earbud", TYPE_POOLS.earbuds],
    ["airpod", TYPE_POOLS.earbuds],
    ["headphone", TYPE_POOLS.headphone],
    ["headset", TYPE_POOLS.headphone],

    ["smartphone", TYPE_POOLS.smartphone],
    ["mobile", TYPE_POOLS.smartphone],
    ["phone", TYPE_POOLS.smartphone],

    ["laptop", TYPE_POOLS.laptop],
    ["notebook", TYPE_POOLS.laptop],

    ["watch", TYPE_POOLS.watch],

    ["wallet", TYPE_POOLS.wallet],
    ["card holder", TYPE_POOLS.wallet],

    ["sunglass", TYPE_POOLS.sunglasses],

    ["shirt", TYPE_POOLS.shirt],
    ["jeans", TYPE_POOLS.jeans],
    ["jacket", TYPE_POOLS.jacket],
    ["dress", TYPE_POOLS.dress],

    ["shoe", TYPE_POOLS.shoes],
    ["sneaker", TYPE_POOLS.shoes],

    ["book", TYPE_POOLS.books],
    ["novel", TYPE_POOLS.books],

    ["sports", TYPE_POOLS.sports],
    ["fitness", TYPE_POOLS.sports],

    ["cosmetic", TYPE_POOLS.cosmetics],
    ["beauty", TYPE_POOLS.cosmetics],
  ];

  const match = rules.find(([keyword]) =>
    text.includes(keyword)
  );

  if (match) {
    return match[1];
  }

  return (
    IMAGE_POOLS[product?.category] ||
    IMAGE_POOLS.Electronics
  );
};

export const getProductImage = (
  product,
  index = 0
) => {
  const pool = getProductImagePool(product);

  if (!pool.length) {
    return IMAGE_POOLS.Electronics[0];
  }

  const position =
    (hashProduct(product) + index) % pool.length;

  return pool[position];
};

export const getProductGalleryImages = (product) => {
  const pool = getProductImagePool(product);

  const seed = hashProduct(product);

  const generated = [0, 1, 2, 3].map(
    (offset) =>
      pool[(seed + offset) % pool.length]
  );

  const backend = Array.isArray(product?.images)
    ? product.images.filter(
        (url) =>
          typeof url === "string" &&
          url.trim().length > 0
      )
    : [];

  return [
    ...generated,
    ...backend,
  ]
    .filter(
      (url, index, arr) =>
        arr.indexOf(url) === index
    )
    .slice(0, 6);
};