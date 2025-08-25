"use client";
import React, { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [allcomments, setAllComment] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch("http://localhost:5000/comments");
    const data = await res.json();
    setAllComment(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;
    await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, comment }),
    });
    setName("");
    setComment("");
    fetchComments();
  };

  return (
    <>
      <h1 className="font-serif text-center text-2xl font-extrabold p-6">
        Test Blog Site
      </h1>
      <section className="flex flex-wrap flex-col">
        <p className="font-sans font-light p-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          tempore nesciunt unde officia tempora totam est quidem praesentium quo
          non fugit iusto at tenetur, aspernatur, inventore ea enim atque
          nostrum eligendi iure ipsa quaerat. Minus sequi quibusdam quia
          repellat atque. Quae, adipisci obcaecati? Corrupti, ipsam rem veniam
          laboriosam delectus fugiat libero provident? Porro deserunt ea
          voluptatibus. Inventore necessitatibus voluptatum iste nam recusandae
          optio voluptas nihil ab vero corporis ad, quae harum quod officia
          reprehenderit blanditiis tempore, quasi asperiores excepturi. Sequi
          explicabo maxime quas, cum modi repellendus accusamus eaque possimus
          officiis fugiat libero ad aperiam assumenda, veniam reiciendis
          delectus sit repudiandae? Dolor repellat enim optio consequuntur velit
          quas, placeat neque? Sint harum voluptatem mollitia animi! Dolorem
          labore, consequatur perspiciatis explicabo repudiandae iste pariatur
          ut repellat facere recusandae quos sit ipsa! Accusantium possimus
          expedita, deleniti voluptatibus incidunt eos cum. Temporibus
          voluptates voluptatibus minima, voluptas dolorum excepturi earum ab
          nam vero ipsam rem sapiente, consequuntur ipsa nesciunt voluptatem
          autem nobis. Veritatis vel quaerat ad? Distinctio necessitatibus
          laborum alias vel illo. Iste eveniet quasi fuga, magnam adipisci et
          consequuntur. Ea, a! Laudantium excepturi id recusandae, a accusantium
          magni perferendis totam ut consequuntur aspernatur adipisci
          necessitatibus quasi omnis quae et! Et recusandae laboriosam culpa,
          placeat quaerat pariatur eaque aperiam quasi quidem doloribus
          excepturi officiis! Molestias officia earum quidem nulla adipisci,
          nobis saepe esse eum delectus similique accusamus, nostrum
          necessitatibus omnis minima animi eos eveniet error molestiae odio
          provident, consectetur dolorem iste perferendis. Ipsa necessitatibus
          illum distinctio voluptas culpa similique dolore exercitationem
          corporis, reiciendis commodi eius laborum eveniet expedita iusto
          totam, laboriosam cumque! Voluptatibus aut atque quod doloremque
          possimus, facere rerum commodi esse quam tempore! Doloremque, quis
          unde dolores accusantium, pariatur placeat facilis tenetur delectus
          ducimus maiores impedit quisquam recusandae vitae nulla distinctio
          architecto harum corporis rem voluptas nihil. Maiores reiciendis quia
          nam, mollitia doloribus odit assumenda facilis quod dolore blanditiis,
          sit perferendis placeat officiis ut cumque ipsam vel? Ducimus, quaerat
          nesciunt in fuga quidem sed repudiandae atque hic nulla expedita
          exercitationem dolore, similique necessitatibus facilis! A itaque
          quaerat earum magni dolorem impedit ab laudantium. Quo accusantium
          voluptatem illum aliquid! A odit libero voluptatibus! Cum totam autem
          inventore consectetur dolorum culpa esse soluta, ipsam sequi ipsa
          praesentium maiores sapiente magni commodi voluptates excepturi
          quibusdam sint. Labore doloribus eligendi ex possimus? Odit facilis,
          dolore nisi explicabo? Eum inventore animi blanditiis aspernatur at
          possimus doloremque molestiae esse quis, perferendis consequuntur a
          earum vero? Perspiciatis, modi. Reiciendis, aliquam necessitatibus
          dicta voluptate architecto odit rerum ad earum tempore laudantium quod
          nulla minus ullam, aliquid illum cupiditate voluptas ut quidem, iste
          dolorum nobis accusantium iure! Distinctio, beatae. Consectetur
          deserunt quod deleniti quia rerum nulla sunt iste architecto
          consequatur facere, cumque recusandae quas esse magni, vitae
          perferendis.
        </p>

        <div className="p-6 font-bold text-xl">
          Comments ({allcomments && allcomments.length})
        </div>
        <div className="bg-slate-300 p-6 flex flex-col gap-4">
          {allcomments &&
            allcomments.map((c) => (
              <div
                key={c._id}
                className=" flex flex-col border p-3 rounded-lg bg-gray-50"
              >
                <label className="flex flex-row">
                  Username:&nbsp;
                  <div
                    className="font-semibold"
                    dangerouslySetInnerHTML={{ __html: c.name }}
                  />
                </label>
                <label className="flex flex-row">
                  Comment:&nbsp;
                  <div dangerouslySetInnerHTML={{ __html: c.text }} />
                </label>
                <span className="text-xs pt-2 text-gray-600">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </section>
      <div className="flex justify-center items-center p-6">
        <form
          method="POST"
          className="flex flex-col gap-4 flex-wrap rounded-lg bg-orange-300 w-1/2 justify-center items-center p-4"
        >
          <label className="flex flex-col w-full">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
              className="rounded-md p-1 F"
            />
          </label>
          <label className="flex flex-col w-full">
            Comment
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="enter your comment"
              className="rounded-md p-1 "
            />
          </label>
          <button
            className="rounded-lg w-40 text-white bg-orange-700 px-4 py-2"
            type="submit"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </form>
      </div>
      <footer className="flex flex-wrap bg-slate-900 text-white justify-center items-center p-6">
        <p>@this is a test site only</p>
      </footer>
    </>
  );
};

export default App;
