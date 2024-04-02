import Werefa from "../models/werefamodel.js";
const werefa = async (req, res) => {
  const { id } = req.params;
  var dotr = werefa.amount;
  try {
    const weref = await Werefa.findOne({ station: id });
    if (!weref) {
      res.status(200).json("Doesn't exist!");
      return;
    }
    const vas = weref.station;
    const sorteda = weref.werefa.sort((le, p2) =>
      le.amount < p2.amount ? 1 : le.amount > p2.amount ? -1 : 0
    );
    res.status(200).json({ sorteda, vas });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
const addwerefa = async (req, res) => {
  const { user, paid, amount, station } = req.body;

  try {
    const weref = await Werefa.findOne({ station: req.body.station });

    if (!weref) {
      const newweref = new Werefa({
        station: station,
        werefa: [{ user, paid, amount }],
      });
      const saved = await newweref.save();

      res.status(200).json(saved);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
const updatewerefa = async (req, res) => {
  const { user, paid, amount } = req.body;
  const { id } = req.params;
  console.log("update", id, user, paid, amount);
  try {
    const weref = await Werefa.findOne({ station: id });

    if (!weref) {
      const newweref = new Werefa({
        station: id,
        werefa: [{ user, paid, amount }],
      });
      const saved = await newweref.save();
      console.log("saved", saved);
      res.status(200).json(saved);
      return;
    }
    if (weref.werefa.length < 3) {
      console.log("beforesort", weref.werefa);

      const befsort = await Werefa.updateOne(
        { station: id },
        { $push: { werefa: { user, paid, amount } } }
      );
      // console.log("sorted", befsort);
      // const sorteda = befsort.werefa.sort((le, p2) =>
      //   le.amount < p2.amount ? 1 : le.amount > p2.amount ? -1 : 0
      // );
      const newest = await Werefa.findOne({ station: id });
      const vas = newest.station;
      const sorteda = newest.werefa.sort((le, p2) =>
        le.amount < p2.amount ? 1 : le.amount > p2.amount ? -1 : 0
      );

      res.status(200).json({ sorteda, vas });
      return;
    }
    if (weref.werefa.length === 3) {
      const sorted = weref.werefa.sort((le, p2) =>
        le.amount < p2.amount ? 1 : le.amount > p2.amount ? -1 : 0
      );
      if (sorted[2].amount > amount) {
        res.status(200).json("your position");
        return;
      }
      const posup = await Werefa.findByIdAndUpdate(weref.werefa._id, {
        werefa: sorted,
      });

      console.log("sortenes", posup);
      const notup = await Werefa.updateOne(
        { station: id },
        {
          $pop: { werefa: -1 },
        }
      );
      console.log("notup", notup);
      const up = await Werefa.updateOne(
        { station: id },
        {
          $push: { werefa: { user, paid, amount } },
        }
      );
      console.log("up", up);

      const upnew = await Werefa.findOne({ station: id });
      console.log("upnew", upnew);
      const vas = upnew.station;
      const sorteda = upnew.werefa.sort((le, p2) =>
        le.amount < p2.amount ? 1 : le.amount > p2.amount ? -1 : 0
      );

      res.status(200).json({ sorteda, vas });

      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
export { werefa, addwerefa, updatewerefa };
