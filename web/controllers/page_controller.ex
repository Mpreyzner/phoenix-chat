defmodule Bussy.PageController do
  use Bussy.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
