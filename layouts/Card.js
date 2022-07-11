import React from "react";

function Card(downloadURL, title, categori, context, name, email) {
  return (
    <div>
      <Card className="lg:w-full my-4">
        <p className="m-auto text-center">
          <Image
            className="m-auto text-center max-w-sm"
            height={300}
            width={300}
            src={data.downloadURL}
          />
        </p>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.categori == "ONE PIECE" && (
              <p className="bg-blue-500 p-2 inline-block text-white text-center">
                {data.categori}
              </p>
            )}
            {data.categori == "呪術廻戦" && (
              <p className="bg-purple-500 p-2 inline-block text-white text-center">
                {data.categori}
              </p>
            )}
            {data.categori == "東京リベンジャーズ" && (
              <p className="bg-rose-500 p-2 inline-block text-white text-center">
                {data.categori}
              </p>
            )}
            {data.categori == "キングダム" && (
              <p className="bg-yellow-500 p-2 inline-block text-white text-center">
                {data.categori}
              </p>
            )}
            <br></br>
            <br></br>
            <div className="w-80 m-auto" style={styles}>
              {data.context}
            </div>
            <br></br>
            {data.name}
            <br></br>
            {data.createtime}
          </Typography>
        </CardContent>
        {user.email == data.email && (
          <CardActions>
            <Button
              variant="outlined"
              onClick={() =>
                getID(data.id, data.name, data.age, data.title, data.context)
              }
            >
              更新する
            </Button>
            <Button variant="outlined" onClick={() => deleteDocument(data.id)}>
              削除する
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
}

export default card;
