# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :bussy,
  ecto_repos: [Bussy.Repo]

# Configures the endpoint
config :bussy, Bussy.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "of6nAlX7RUfkVitF7s1Pd1+ZTuO6KqS9l3+N4oyFzZ8l339xuofosv98mJ36Km9E",
  render_errors: [view: Bussy.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Bussy.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
