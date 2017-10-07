# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Bussy.Repo.insert!(%Bussy.SomeModel{})
#Ļ
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Bussy.Repo.delete_all Bussy.User

Bussy.User.changeset(%Bussy.User{}, %{name: "Test User", email: "testuser@example.com", password: "secret", password_confirmation: "secret"})
|> Bussy.Repo.insert!